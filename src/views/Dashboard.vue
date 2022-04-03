<template>
  <div id="dashboard">
    <section>
      <transition name="fade">
        <v-modal v-model="show"></v-modal>
      </transition>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>

          <div v-if="showUploadImage == true" class="create-post">
            <p>upload a photo</p>
            <div class="upload-image-container">
              <button @click="choosePhoto" class="button button--upload-btn">choose photo</button>
              <input
                type="file"
                ref="input1"
                style="display: none"
                @change="preivewImage"
                accept="image/*"
             />
              <button @click="cancel" class="button">cancel</button>
              <div v-if="imageData != null">
                <br>
                <img class="preview" height="268" width="310" :src="img1" />
              </div>
            </div>
          </div>

          <div v-else class="create-post">
            <p>create a post</p>
            <div class="upload-image-container">
              <button @click="showUploadImageComp" class="button">upload an image</button>
            </div>
          </div>

          <div class="create-post">
              <form @submit.prevent>
                  <textarea v-model.trim="post.content"></textarea>
                  <button
                    @click="createPost()"
                    :disabled="post.content === ''"
                    class="button"
                  >
                    post
                  </button>
                </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div v-if="posts.length">
          <div v-for="post in posts" :key="post.id" class="post">
            <h5>{{ post.userName }}</h5>
            <span>{{ formatDate(post.createdOn) }}</span>
            <div v-if="post.image != null" >
                <img class="preview post-image" height="268" width="310" :src="post.image" />
            </div>
            <p>{{ trimLength(post.content) }}</p>
            <ul>
              <li>
                <a @click="toggelCommentModal(post)"
                  >comments {{ post.comments }}</a
                >
              </li>
              <li>
                <a @click="likePost(post.id, post.likes)">likes {{ post.likes }}</a>
              </li>
              <li><a @click="viewPost(post)">view full post</a></li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>

  <!-- full post modal -->
  <transition name="fade">
    <v-modal v-model="show1"></v-modal>
  </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import CommentModal from "@/components/CommentModal";
import FullPostModal from '@/components/FullPostModal';

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";



export default {
  data() {
    return {
      post: {
        content: "",
        image: "",
      },
      show: false,
      show1: true,
      showPostModal: false,
      selectedPost: {},
      fullPost: {}, 
      postComments: [],

      showUploadImage: false,
      img1: "",
      imageData: null,
    };
  },
  computed: {
    ...mapState(["userProfile", "posts"]),
  },
  methods: {
    choosePhoto() {
      this.$refs.input1.click();
    },
    preivewImage(event) {
      this.uploadvalue = 0;
      // this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },
    // to do, add remove functionality to image preview.
    onUpload() {
      this.img1 = null;

      const storageRef = ref(storage, "img/" + this.imageData.name);
      const uploadTask = uploadBytesResumable(storageRef, this.imageData);

      // Listen for state changes, errors and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total to be updated
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + " % done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              alert("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              // User canceled the upload;
              alert("User canceled the upload");
              break;

            // ..

            case "storage/unknown":
              // Unknown error occurred, inspet error.serverResponse
              alert("User canceled the upload");
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            this.post.image = downloadURL;
            this.img1 = downloadURL;
          });
        }
      );
    },

    showUploadImageComp() {
      this.showUploadImage = true;      
    },
    cancel() {
      this.showUploadImage = false;
      this.uploadvalue = 0;
      this.img1 = ''
      this.imageData = null

    },
    createPost() {
      // send the payload as a full object?
      this.$store.dispatch("createPost", { 
        content: this.post.content,
        image: this.post.image 
        });
      this.post.content = "";
    },
    formatDate(val) {
      if (!val) {
        return "-";
      }

      let date = val.toDate();
      return moment(date).fromNow();
    },
    trimLength(val) {
      if (val.length < 200) {
        return val;
      }
      return `${val.substring(0, 200)}...`;
    },
    toggelCommentModal(post) {
      this.$vfm.show({
        component: CommentModal,
        bind: {
          name: "CommentModal",
          post: post,
        },
      });
      if (this.show) {
        this.selectedPost = post;
      } else {
        this.selectedPost = {};
      }
    },
    likePost(id, likesCount) {
      this.$store.dispatch('likePost', { id, likesCount })
    },
    viewPost(post) {
      this.$vfm.show({
        component: FullPostModal,
        bind: {
          name: "FullPostModal",
          post: post,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>

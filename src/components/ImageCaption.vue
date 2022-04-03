<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div>
          <h3>Chose a photo</h3>
          <button @click="click1" class="button button--upload-btn">
            choose photo
          </button>
          <input
            type="file"
            ref="input1"
            style="display: none"
            @change="preivewImage"
            accept="image/*"
          />
        </div>
        <div v-if="imageData != null">
          <img class="preview" height="268" width="365" :src="img1" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <br />
        <input
          class="form-control form-control-lg"
          type="text"
          placeholder="caption goes here"
          aria-label="upload photo"
          v-model="caption"
        />
        <br />
        <button type="button" class="btn btn-primary" @click="create">
          upload
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";
import * as fb from "../firebase";

export default {
  data() {
    return {
      caption: "",
      img1: "",
      imageData: null,
    };
  },
  methods: {
    create() {
      // add the image obj to the image collection -> creates one if none exists
      fb.imageCollection
        .add({
          createdOn: new Date(),
          content: this.img1,
          caption: this.caption,
          userId: fb.auth.currentUser.uid,
          userName: this.$store.state.userProfile.name,
          comments: 0,
          likes: 0,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    click1() {
      this.$refs.input1.click();
    },
    preivewImage(event) {
      // (this.uploadvalue) think of this as the const progress
      this.uploadvalue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },
    onUpload() {
      this.img1 = null;

      const storageRef = ref(storage, "img/" + this.imageData.name);
      // arguments: where, and what... lol
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
            console.log("File available at", downloadURL);
            this.img1 = downloadURL;
          });
        }
      );
    },
  },
};
</script>

<style></style>

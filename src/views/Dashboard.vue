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
          <div class="create-post">
            <p>create a post</p>
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
              <li><a>view full post</a></li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import CommentModal from "@/components/CommentModal";

export default {
  data() {
    return {
      post: {
        content: "",
      },
      show: false,
      selectedPost: {},
    };
  },
  computed: {
    ...mapState(["userProfile", "posts"]),
  },
  methods: {
    createPost() {
      this.$store.dispatch("createPost", { content: this.post.content });
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
      // if opening modal set selectedPost, else clear
      if (this.show) {
        this.selectedPost = post;
      } else {
        this.selectedPost = {};
      }
    },
    likePost(id, likesCount) {
      this.$store.dispatch('likePost', { id, likesCount })
    }
  },
};
</script>

<style scoped lang="scss"></style>

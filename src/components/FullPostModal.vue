<template>
  <vue-final-modal v-slot="{  }" name="fullpost-modal">
    <div class="p-modal">
      <div class="p-container">
        <div class="post">
          <button class="close" @click="closeModal()">
            <i class="far fa-times-circle fa-2x"></i>
          </button>
          <h5>{{ fullPost.userName }}</h5>
          <span>{{ formatDate(fullPost.createdOn) }}</span>
          <p>{{ fullPost.content }}</p>
          <ul>
            <li><a>comments {{ fullPost.comments }}</a></li>
            <li><a>likes {{ fullPost.likes }}</a></li>
          </ul>
        </div>
        <div v-show="postComments.length" class="comments">
          <div v-for="comment in postComments" :key="comment.id" class="comment">
            <p>{{ comment.userName }}</p>
            <span>{{ formatDate(comment.createdOn) }} date</span>
            <p>{{ comment.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { commentsCollection } from "@/firebase";
import moment from "moment";

export default {
  props: ["post"],
  data() {
    return {
      fullPost: {},
      postComments: []
    }
  },
  created() {
    this.getComments()
  },
  methods: {
      formatDate(val) {
      if (!val) {
        return "-";
      }

      let date = val.toDate();
      return moment(date).fromNow();
    },
    async getComments() {
      const docs = await commentsCollection.where('postId', '==', this.post.id).get()
      
      docs.forEach(doc => {
        let comment = doc.data()
        comment.id = doc.id
        this.postComments.push(comment)
      })

      this.fullPost = this.post
    },
    closeModal() {
      this.postComments = []
      this.$vfm.hideAll()
    }
  },
};
</script>

<style scoped></style>

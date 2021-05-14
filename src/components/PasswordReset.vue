<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
  >
    <button class="close" @click="close">
      <i class="far fa-times-circle fa-2x"></i>
    </button>

    <div class="modal__content">
      <h3>Reset Password</h3>
      <div v-if="!showSuccess" class="modal-logic">
        <p>Enter your email to reset your password</p>
        <form @submit.prevent>
          <input
            v-model.trim="email"
            type="email"
            placeholder="your@email.com"
          />
        </form>
        <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
        <button @click="resetPassword()" class="button">Reset</button>
      </div>
      <p v-else>Success! Check your email for a reset link.</p>  
    </div>
  </vue-final-modal>
</template>

<script>
import { auth } from '../firebase';

export default {
  data() {
    return {
      errorMsg: '',
      email: '',
      showSuccess: false
    }
  },
  methods: {
    async resetPassword() {
      // reset logic
      this.errorMsg = "";
      try {
        await auth.sendPasswordResetEmail(this.email);
        this.showSuccess = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
  },
  name: "VModal",
  inheritAttrs: false,
  emits: ["confirm", "cancel"],
};
</script>

<style scoped>


</style>

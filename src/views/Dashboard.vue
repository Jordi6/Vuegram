<template>
  <div>
    <span>Dashboard</span>
    <button @click="logout()" class="btn btn-outline-primary">
      Sign out
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout", {
      });
    },
  },
};
</script>

<style lang="scss">
span {
  color: red;
  size: 50px;
}
</style>

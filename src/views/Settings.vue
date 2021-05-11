<template>
<div>
  <span>settings</span>
  <br>
  <button @click="goHome()" class="button">home btn</button>
</div>
</template>

<script>
import router from '../router/index'

export default {
  methods: {
    goHome() {
      router.push('/')
    }
  }

}
</script>

<style lang="scss">
  div {
    padding: 1em;
  }
</style>
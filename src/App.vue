<template>
  <div id="app">
    <SiteNav v-if="showNav"></SiteNav>
    <router-view />
    <modals-container></modals-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SiteNav from "@/components/SiteNav";

export default {
  components: {
    SiteNav,
  },
  computed: {
    ...mapState(["userProfile"]),
    showNav() {
      return Object.keys(this.userProfile).length > 1;
    },
  },
};
</script>

<script>
import VHeader from "@/components/VHeader.vue";

export default {
  name: "HomeView",
  components: {
    VHeader,
  },
};
</script>

<template>
  <div id="app" class="container">
    <VHeader />
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view />
  </div>
</template>

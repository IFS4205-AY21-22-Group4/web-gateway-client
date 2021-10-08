<template>
  <Navbar />
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
  methods: {},
};
</script>

<style >
body {
  margin: 0;
  padding: 0;
}
</style>

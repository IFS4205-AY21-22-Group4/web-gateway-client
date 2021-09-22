<template>
  <div class="container">
    <Header title="Web Gateway Client" />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
  methods: {},
};
</script>

<style>
</style>

<template>
  <div class="container">
    <Header title="Site Owner" />
    <p>Email:</p>
    <p>Postal Code:</p>
    <p>Unit-no:</p>
  </div>
</template>

<script>
import Header from "./Header";

export default {
  name: "Profile",
  components: {
    Header,
  },
};
</script>
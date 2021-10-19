<template>
  <td scope="row">{{ index + 1 }}</td>
  <td>{{ identity }}</td>
  <td>
    <Button class="btn btn-outline-success" text="Check-in" />
  </td>
</template>

<script>
import Button from "@/components/Button";

export default {
  name: "Token",
  props: {
    token: Object,
    index: Number,
  },
  data() {
    return {
      identity: "",
    };
  },
  components: {
    Button,
  },
  created() {
    // to replace with token logic
    this.identity = this.token.name;
  },
};
</script>
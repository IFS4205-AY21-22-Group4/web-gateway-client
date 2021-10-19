<template>
  <td scope="row">{{ index + 1 }}</td>
  <td>{{ token.nric }}</td>
  <td>
    <Button
      class="btn btn-outline-success"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="$emit('verify-token', token)"
      text="Check-in"
    />
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
  components: {
    Button,
  },
  created() {
    //this.getIdentity();
    // to replace with token logic
  },
  emits: ["verify-token"],
};
</script>
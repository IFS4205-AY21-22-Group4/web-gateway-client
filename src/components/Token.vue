<template>
  <td scope="row">{{ index + 1 }}</td>
  <td>{{ identity }}</td>
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
import { gatewayAPI } from "../axios-api";
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
  methods: {
    getIdentity() {
      gatewayAPI
        .get(`/api/v1/token/${this.token.uuid}`, {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log("Received data from gateway API");
          this.identity = response.data.nric;
        })
        .catch((error) => {
          this.identity = "Unknown";
          console.log(error);
        });
    },
  },
  created() {
    this.getIdentity();
    // to replace with token logic
  },
  emits: ["verify-token"],
};
</script>
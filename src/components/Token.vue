<template>
  <td scope="row">{{ index + 1 }}</td>
  <td>{{ identity }}</td>
  <td>
    <Button class="btn btn-outline-success" text="Check-in" />
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
          console.log(response.data);
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
    //this.identity = "S****152G";
  },
};
</script>
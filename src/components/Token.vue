<template>
  <td scope="row">{{ index + 1 }}</td>
  <td>{{ identity }}</td>
  <td>
    <Button 
      class="btn btn-outline-success"
      text="Check-in"
    />
  </td>
</template>

<script>
import { gatewayAPI } from "@/axios-api";
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
    retrieveUserInfo() {
      gatewayAPI
        .get(
          `/api/v1/token/${this.token.name}`,
          {
            headers: {
              Authorization: `Token ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          this.identity = response.data.nric;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.retrieveUserInfo();
  },
};
</script>
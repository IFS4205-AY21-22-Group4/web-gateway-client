<template>
  <td scope="row">{{ index + 1 }}</td>
  <td>{{ gateway.gateway_id }}</td>
  <td class="text-center">
    <i
      class="fas fa-solid fa-circle"
      :class="
        gateway.authentication_token === null ? 'text-success' : 'text-danger'
      "
    ></i>
  </td>
  <td>
    <Button
      class="btn-outline-dark"
      @click="toggleGateway"
      :text="gateway.authentication_token === null ? 'Start' : 'Stop'"
    />
  </td>
</template>

<script>
import { createHash } from "crypto";
import { gatewayAPI } from "@/axios-api";
import Button from "./Button";

export default {
  name: "Gateway",
  props: {
    gateway: Object,
    index: Number,
  },
  components: {
    Button,
  },
  methods: {
    toggleGateway() {
      gatewayAPI
        .put(
          `/api/v1/gateways/${this.gateway.id}`,
          {},
          {
            headers: {
              Authorization: `Token ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (this.gateway.authentication_token === null) {
            this.gateway.authentication_token =
              response.data.authentication_token;
            this.$router.push({
              name: "Discovery",
              params: { gateway_id: this.gateway.gateway_id },
            });
          } else {
            if (
              confirm(
                "Gateway still running on a different device. Indicate stop anyway?"
              ) === true
            ) {
              this.gateway.authentication_token = null;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async autoStopGateway() {
      if (this.gateway.authentication_token !== null) {
        const hash = createHash("sha256");
        hash.update(sessionStorage.getItem("token"));
        const verify_hash = hash.digest("hex");

        if (verify_hash === this.gateway.authentication_token) {
          gatewayAPI
            .put(
              `/api/v1/gateways/${this.gateway.id}`,
              {},
              {
                headers: {
                  Authorization: `Token ${sessionStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              this.gateway.authentication_token =
                response.data.authentication_token;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
  },
  created() {
    this.autoStopGateway();
  },
};
</script>
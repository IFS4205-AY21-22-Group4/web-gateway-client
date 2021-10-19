<template>
  <div class="text-center alert alert-success show" role="alert">
    Gateway <strong> {{ $route.params.gateway_id }}</strong> is discovering
    tokens around nearby proximity.
  </div>

  <Header title="Tokens Discovered" />
  <Tokens :tokens="tokens" />

  <div class="text-center">
    <div
      class="spinner-border spinner-border-sm ms-auto text-primary"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <strong> Discovering...</strong>
  </div>
</template>

<script>
import { localAPI, gatewayAPI } from "../axios-api";
import Header from "@/components/Header";
import Tokens from "@/components/Tokens";

export default {
  name: "Discovery",
  components: {
    Header,
    Tokens,
  },
  data() {
    return {
      tokens: [],
      timer: null,
    };
  },
  methods: {
    checkToken(token) {
      gatewayAPI
        .get(`/api/v1/token/${token.uuid}`, {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          //console.log("Received data from local API");
          this.tokens.push(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    discoverTokens() {
      localAPI
        .get("/discover_tokens", {})
        .then((response) => {
          //console.log("Received data from local API");
          var tokens = response.data;
          for (var i = 0; i < tokens.length; i++) {
            this.checkToken(tokens[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.discoverTokens();
  },
};
</script>
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
          this.tokens.push(response.data);
        });
    },
    discoverTokens() {
      localAPI.get("/discover_tokens", {}).then((response) => {
        this.tokens = [];
        var tokens = response.data;
        for (var i = 0; i < tokens.length; i++) {
          this.checkToken(tokens[i]);
        }
      });
    },
  },
  created() {
    this.discoverTokens();
    this.timer = setInterval(() => {
      this.discoverTokens();
    }, 10000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>
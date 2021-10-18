<template>
  <div class="text-center alert alert-success show" role="alert">
    Gateway <strong> {{ $route.params.gateway_id }}</strong> is running and
    discovering tokens around nearby proximity.
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
import { localAPI } from "../axios-api";
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
    discoverTokens() {
      localAPI
        .get("/discover_tokens", {})
        .then((response) => {
          console.log("Received data from local API");
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.discoverTokens();
    //this.tokens = [{ uuid: "test" }, { uuid: "test2" }];
  },
};
</script>
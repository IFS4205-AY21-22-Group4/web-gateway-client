<template>
  <td scope="row">{{ index + 1 }}</td>
  <td>{{ gateway.gateway_id }}</td>
  <td class="text-center">
    <i class="fas fa-solid fa-circle text-success"></i>
  </td>
  <td>
    <Button
      class="btn-outline-dark"
      @click="toggleGateway"
      :text="gateway.gateway_id === gatewayRunning ? 'Stop' : 'Start'"
    />
  </td>
</template>

<script>
import Button from "./Button";

export default {
  name: "Gateway",
  data() {
    return {
      gatewayRunning: "",
    };
  },
  props: {
    gateway: Object,
    index: Number,
  },
  components: {
    Button,
  },
  methods: {
    toggleGateway() {
      if (sessionStorage.getItem("gatewayRunning") === null) {
        sessionStorage.setItem("gatewayRunning", this.gateway.gateway_id);
        this.$router.push({ name: "Discovery" });
      } else {
        sessionStorage.removeItem("gatewayRunning");
        this.gatewayRunning = "";
      }
    },
  },
  created() {
    if (sessionStorage.getItem("gatewayRunning")) {
      this.gatewayRunning = sessionStorage.getItem("gatewayRunning");
    } else {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style scoped>
</style>
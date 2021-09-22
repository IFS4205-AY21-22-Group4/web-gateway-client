<template>
  <div class="container">
    <h2>Gateways</h2>
    <table>
      <tr>
        <th>#</th>
        <th>Gateway ID</th>
        <th>Actions</th>
      </tr>
      <tr :key="gateway.id" v-for="gateway in gateways">
        <Gateway
          @toggle-gateway="$emit('toggle-gateway', gateway.gateway_id)"
          :gateway="gateway"
          :gatewayRunning="gatewayRunning"
        />
      </tr>
    </table>
    <Button @click="$emit('add-gateway')" text="Add Gateway" />
    <Button @click="$emit('remove-gateway')" text="Remove Gateway" />
  </div>
</template>

<script>
import Button from "./Button";
import Gateway from "./Gateway";

export default {
  name: "Gateways",
  props: {
    gateways: Array,
    gatewayRunning: String,
  },
  components: {
    Button,
    Gateway,
  },
  emits: ["add-gateway", "remove-gateway", "toggle-gateway"],
};
</script>
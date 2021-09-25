<template>
  <th scope="row">{{ index + 1 }}</th>
  <th>{{ gateway.gateway_id }}</th>
  <th>
    <Button
      class="btn-outline-dark"
      @click="$emit('toggle-gateway', gateway.gateway_id)"
      :text="gateway.gateway_id === gatewayRunning ? 'Stop' : 'Start'"
    />
  </th>
</template>

<script>
import Button from "./Button";

export default {
  name: "Gateway",
  props: {
    gateway: Object,
    index: Number,
    gatewayRunning: String,
  },
  components: {
    Button,
  },
  emits: ["toggle-gateway"],
};
</script>
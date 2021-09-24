<template>
  <th scope="row">{{ gateway.id }}</th>
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
    gatewayRunning: String,
  },
  components: {
    Button,
  },
  emits: ["toggle-gateway"],
};
</script>
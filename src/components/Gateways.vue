<template>
  <div class="container">
    <h3>Gateways</h3>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Gateway ID</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr :key="gateway.gateway_id" v-for="(gateway, index) in gateways">
          <Gateway
            @toggle-gateway="$emit('toggle-gateway', gateway.gateway_id)"
            :gateway="gateway"
            :index="index"
            :gatewayRunning="gatewayRunning"
          />
        </tr>
      </tbody>
    </table>
    <div class="container">
      <div class="row">
        <div class="col text-center">
          <Button
            class="btn-outline-success"
            @click="$emit('add-gateway')"
            text="Add Gateway"
          />
          <Button
            class="btn-outline-danger"
            @click="$emit('remove-gateway')"
            text="Remove Gateway"
          />
        </div>
      </div>
    </div>
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
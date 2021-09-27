<template>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <table class="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Gateway ID</th>
            <th class="text-center" scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr :key="gateway.gateway_id" v-for="(gateway, index) in gateways">
            <Gateway :gateway="gateway" :index="index" />
          </tr>
        </tbody>
      </table>
    </div>

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
  },
  components: {
    Button,
    Gateway,
  },
  emits: ["add-gateway", "remove-gateway"],
};
</script>
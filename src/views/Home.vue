<template>
  <Gateways
    @add-gateway="addGateway"
    @remove-gateway="removeGateway"
    @toggle-gateway="toggleGateway"
    :gateways="gateways"
    :gatewayRunning="gatewayRunning"
  />
</template>

<script>
import Gateways from "../components/Gateways";

export default {
  name: "Home",
  components: {
    Gateways,
  },
  data() {
    return {
      gateways: [],
      gatewayRunning: "",
    };
  },
  methods: {
    async addGateway() {
      const totalGateways = this.gateways.length;
      const index = totalGateways + 1;
      const gatewayToAdd = {
        id: index,
        gateway_id: "610123-13-37-" + index,
      };

      const res = await fetch("api/gateways/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gatewayToAdd),
      });

      const data = await res.json();

      this.gateways = [...this.gateways, data];
    },
    async removeGateway() {
      const totalGateways = this.gateways.length;
      const id = totalGateways; // bad way to get id

      const res = await fetch(`api/gateways/${id}`, {
        method: "DELETE",
      });

      res.status === 200
        ? (this.gateways = this.gateways.filter(
            (gateway) =>
              gateway.gateway_id !==
              gateway.gateway_id.slice(0, -1) + totalGateways
          ))
        : alert("Error deleting gateway");
    },
    toggleGateway(gateway_id) {
      if (this.gatewayRunning === "") {
        this.gatewayRunning = gateway_id;

        console.log(`Gateway ${this.gatewayRunning} running.`);
      } else if (this.gatewayRunning === gateway_id) {
        this.gatewayRunning = "";

        console.log(`Gateway ${this.gatewayRunning} stopped.`);
      }
    },
    async fetchGateways() {
      const res = await fetch("api/gateways/");
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.gateways = await this.fetchGateways();
  },
};
</script>

<template>
  <Navbar />
  <Gateways
    @add-gateway="addGateway"
    @remove-gateway="removeGateway"
    @toggle-gateway="toggleGateway"
    :gateways="gateways"
    :gatewayRunning="gatewayRunning"
  />
</template>

<script>
import { gatewayAPI } from "@/axios-api";
import Navbar from "@/components/Navbar";
import Gateways from "../components/Gateways";

export default {
  name: "Home",
  components: {
    Navbar,
    Gateways,
  },
  data() {
    return {
      gateways: [],
      gatewayRunning: "",
    };
  },
  methods: {
    addGateway() {
      const totalGateways = this.gateways.length;
      const index = totalGateways + 1;

      gatewayAPI
        .post("/gateways/", {
          id: index,
          gateway_id: "610123-13-37-" + index,
        })
        .then((response) => {
          this.gateways = [...this.gateways, response.data];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async removeGateway() {
      const totalGateways = this.gateways.length;
      const id = totalGateways; // bad way to get id

      gatewayAPI
        .delete(`/gateways/${id}`)
        .then((response) => {
          this.gateways = this.gateways.filter(
            (gateway) =>
              gateway.gateway_id !==
              gateway.gateway_id.slice(0, -1) + totalGateways
          );
        })
        .catch((error) => {
          alert("Error deleting gateway");
        });
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
    fetchGateways() {
      gatewayAPI
        .get("/gateways/")
        .then((response) => {
          console.log("Received data from gateway API");
          this.gateways = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.fetchGateways();
  },
};
</script>

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
      gatewayAPI
        .post(
          "/api/v1/gateways/",
          {},
          {
            headers: {
              Authorization: `Token ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          this.gateways = [...this.gateways, response.data];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeGateway() {
      gatewayAPI
        .delete("/api/v1/gateways/", {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.gateways = this.gateways.filter((gateway) => {
            return gateway.gateway_id !== response.data.gateway_id;
          });
        })
        .catch((error) => {
          console.log(error);
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
        .get("/api/v1/gateways/", {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        })
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

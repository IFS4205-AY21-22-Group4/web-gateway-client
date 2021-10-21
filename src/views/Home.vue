<template>
  <Header title="Gateways" />
  <Gateways
    @add-gateway="addGateway"
    @remove-gateway="removeGateway"
    :gateways="gateways"
  />
</template>

<script>
import { gatewayAPI } from "@/axios-api";
import Header from "@/components/Header";
import Gateways from "../components/Gateways";

export default {
  name: "Home",
  components: {
    Gateways,
    Header,
  },
  data() {
    return {
      gateways: [],
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
          if (response.status === 204) {
            alert(
              "You have reached the maximum limit for number of gateways. The current limit is 4."
            );
          } else {
            this.gateways = [...this.gateways, response.data];
          }
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
          if (response.status === 204) {
            alert(response.data);
          } else {
            this.gateways = this.gateways.filter((gateway) => {
              return gateway.gateway_id !== response.data.gateway_id;
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 405) {
            alert(error.response.data);
          }
        });
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
          if (error.response.status === 401) {
            // token probably expired
            sessionStorage.removeItem("token");
            this.$router.push({ name: "Login" });
          }
        });
    },
  },
  created() {
    this.fetchGateways();
  },
};
</script>

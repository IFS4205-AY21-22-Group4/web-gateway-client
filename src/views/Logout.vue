<template>
  <div class="logout"></div>
</template>

<script>
import { gatewayAPI } from "@/axios-api";

export default {
  name: "Logout",
  methods: {
    logout() {
      gatewayAPI
        .post(
          "/api/logout/",
          {},
          {
            headers: {
              Authorization: `Token ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log("Logout successful");
          sessionStorage.clear();
        })
        .catch((error) => {
          console.log("Logout failed");
        })
        .finally(() => {
          this.$router.push({ name: "Login" });
        });
    },
  },
  created() {
    this.logout();
  },
};
</script>
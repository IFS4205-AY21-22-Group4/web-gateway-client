<template>
  <Header title="User Authentication" />

  <div class="text-center">
    <div class="user">{{ $route.params.user }}</div>

    <input 
      class="input" 
      v-on:keyup.enter="authenticate" 
      v-model="pin" 
      type="password" 
      placeholder="Enter password" 
      autocomplete="off"
    >
  
    <div class="buttons">
      <button  @click="authenticate" class="btn btn-success">Submit</button>
      <div class="divider"/>
      <button @click="return" class="btn btn-secondary">Back</button>
    </div>

    <p class="text-center text-danger" v-if="authenticationFailed">
      Incorrect password.
    </p>
    
  </div>
</template>

<script>
import { gatewayAPI } from "@/axios-api";
import Header from "@/components/Header";

export default {
  name: "UserAuth",

  components: {
    Header,
  },
  data() {
    return {
      pin: "",
      authenticationFailed: false,
    };
  },
  methods: {
    authenticate() {
      gatewayAPI
        .post(
          "/api/v1/gatewayrecord/",
          {
            token_uuid: this.$route.params.token,
            gateway_id: this.$route.params.gateway_id,
            pin: this.pin,
          },
          {
            headers: {
              Authorization: `Token ${sessionStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => {
          if (response.data != "Added gateway record") {
            alert(response.data);
            this.authenticationFailed = true;
            this.pin = "";
          } else {
            console.log("User authorized");
            alert("Successfully checked in!");
            setTimeout(this.return(), 3000);
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    return() {
      this.$router.push({
        name: "Discovery",
        params: {gateway_id: this.$route.params.gateway_id}
      });
    }
  },
  created() {
  }
};
</script>

<style>
.user {
  font-size: 30px;
  padding: 30px;
}
.input {
  padding: 15px;
  margin: 15px;
}
.buttons {
  display: flex;
  justify-content: center;
}
.divider {
  padding: 20px;
}
</style>
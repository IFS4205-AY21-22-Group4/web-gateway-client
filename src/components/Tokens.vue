<template>
  <Modal :token="token" />
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <table class="table table-striped table-hover align-middle">
        <thead>
          <th class="scoped">#</th>
          <th class="scoped">Identity</th>
          <th class="scoped">Actions</th>
        </thead>

        <tbody>
          <tr :key="token.uuid" v-for="(token, index) in tokens">
            <Token
              :index="index"
              :token="token"
              @verify-token="verifyToken(token)"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Token from "@/components/Token";
import Modal from "@/components/Modal";

export default {
  name: "Tokens",
  props: {
    tokens: Array,
  },
  components: {
    Token,
    Modal,
  },
  data() {
    return {
      token: null,
    };
  },
  methods: {
    verifyToken(token) {
      this.token = token;
    },
  },
};
</script>
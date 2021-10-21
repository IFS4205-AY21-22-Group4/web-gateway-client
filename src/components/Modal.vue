<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Verify Token</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="token">
          <div class="modal-body">
            <p>Please enter your Token PIN to verify your identity.</p>
            <p><strong>Identity</strong>: {{ token.nric }}</p>
            <p><strong>Status</strong>: {{ status }}</p>
            <form @submit.prevent="verifyToken">
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Token PIN</label>
                <div class="col-sm-8">
                  <input
                    class="form-control"
                    required
                    v-model="token_pin"
                    type="password"
                  />
                </div>
              </div>

              <button type="submit" class="btn btn-primary w-100 mb-2">
                Verify & Check-in
              </button>
              <p class="text-center text-danger" v-if="inactiveToken">
                Your token is inactive. Please visit a Token Issuing Centre for
                a new token.
              </p>
              <p
                class="text-center text-danger"
                v-if="unvaccinated && !inactiveToken"
              >
                You are unvaccinated and not allowed to enter the premises.
                Please leave immediately.
              </p>
            </form>
          </div>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    token: Object,
  },
  data() {
    return {
      status: "Pending",
      token_pin: "",
      inactiveToken: false,
      unvaccinated: false,
    };
  },
  methods: {
    verifyToken() {
      console.log("TODO verify token");
    },
  },
};
</script>
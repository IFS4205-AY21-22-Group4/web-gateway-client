<template>
  <!-- <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Verify Token</h5>
        <button
          type="button"
          class="btn-close"
          @click="$emit('close')"
        ></button>
      </div>

      <div class="modal-body">
        <p>Identity: Placeholder</p>
        <p>Please enter your Token PIN</p>
        <form @submit.prevent="verifyToken">
          <div class="mb-3">
            <label class="form-label">Token PIN</label>
            <input class="form-control" required type="password" />
          </div>
          <p class="text-center text-danger" v-if="inactiveToken">
            Your token is inactive. Please visit a Token Issuing Centre for a
            new token.
          </p>
          <p class="text-center text-danger" v-if="unvaccinated">
            You are unvaccinated and not allowed to enter this premises. Please
            leave immediately.
          </p>
        </form>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Verify</button>
      </div>
    </div>
  </div> -->
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
            <p>Please enter your Token PIN to verify that your identity.</p>
            <p><strong>Identity</strong>: Placeholder {{ token.uuid }}</p>
            <form @submit.prevent="verifyToken">
              <div class="mb-1 row">
                <label class="col-sm-4 col-form-label">Token PIN</label>
                <div class="col-sm-8">
                  <input class="form-control" required type="password" />
                </div>
              </div>
              <p class="text-center text-danger" v-if="inactiveToken">
                Your token is inactive. Please visit a Token Issuing Centre for
                a new token.
              </p>
              <p class="text-center text-danger" v-if="unvaccinated">
                You are unvaccinated and not allowed to enter this premises.
                Please leave immediately.
              </p>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">
            Verify & Check-in
          </button>
        </div>
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
      inactiveToken: false,
      unvaccinated: false,
    };
  },
};
</script>
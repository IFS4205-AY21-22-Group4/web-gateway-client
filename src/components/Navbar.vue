<template>
  <div class="nav-bar">
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="container">
        <span class="navbar-brand mb-0 h1">Web Gateway</span>

        <div class="collapse navbar-collapse">
          <div class="navbar-nav">
            <router-link :to="{ name: 'Home' }" class="nav-link" exact
              >Gateways</router-link
            >
          </div>
        </div>
        <div class="navbar-nav">
          <router-link :to="{ name: 'Logout' }" class="nav-link" exact>
            Logout
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
</style>
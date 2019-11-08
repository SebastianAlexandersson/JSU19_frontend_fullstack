<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img :src="logo" width="112" height="28">
      </a>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">
          Cities
        </router-link>

        <router-link class="navbar-item" to="/add-city">
          Add city
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      logo: this.$store.state.logo,
    }
  },
}
</script>

<style>

</style>
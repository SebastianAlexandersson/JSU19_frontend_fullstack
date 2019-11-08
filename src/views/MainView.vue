<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Cities</h1>
      <Cities />
    </div>
  </section>
</template>

<script>
import Cities from '../components/Cities.vue'

export default {
  name: 'main-view',
  components: {
    Cities
  }
}
</script>

<style>

</style>
<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Add City</h1>
      <AddCity />
    </div>
  </section>
</template>

<script>
import AddCity from '../components/AddCity.vue'

export default {
  name: 'add-city-view',
  components: {
    AddCity
  }
}
</script>

<style>

</style>
<template>
  <article>
    <ErrorMsg v-if="isError" />
    <SuccessMsg v-if="isSuccess" :message="message" />
    <table class="table">
      <thead>
        <th>Name</th>
        <th>Population</th>
      </thead>
      <tbody>
        <tr v-for="city in cities" :key="city.id">
          <td>{{ city.name }}</td>
          <td>{{ city.population }}</td>
          <td><a class="delete" @click="deleteCity(city.id)"></a></td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
import ErrorMsg from './ErrorMsg.vue'
import SuccessMsg from './SuccessMsg.vue'

export default {
  name: 'cities',
  components: {
    ErrorMsg,
    SuccessMsg
  },
  data() {
    return {
      message: 'Deleted city.'
    }
  },
  computed: {
    cities() {
      return this.$store.state.cities
    },
    isError() {
      return this.$store.state.error
    },
    isSuccess() {
      return this.$store.state.success
    }
  },
  methods: {
    deleteCity(id) {
      this.$store.dispatch('deleteCity', id)
    } 
  }
}
</script>

<style>

</style>
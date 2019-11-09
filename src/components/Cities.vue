<template>
  <article>
    <ErrorMsg v-if="isError" />
    <SuccessMsg v-if="isSuccess" :message="message" />
    <table class="table">
      <thead>
        <th>Name</th>
        <th>Population</th>
        <th>Edit</th>
        <th>Delete</th>
      </thead>
      <tbody>
        <tr v-for="city in cities" :key="city.id">
          <td>
            <input type="text" class="input is-primary" v-if="editId === city.id" v-model="name">
            <span v-if="editId !== city.id">{{ city.name }}</span>
          </td>
          <td>
            <input type="number" class="input is-primary" v-if="editId === city.id" v-model="population">
            <span v-if="editId !== city.id">{{ city.population }}</span>
          </td>
          <td>
            <button class="button is-info" @click="setEditId(city)" v-if="editId !== city.id">Edit</button>
            <button class="button is-success" @click="updateCity(city.id)" v-if="editId === city.id">Submit</button>
          </td>
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
      editId: null,
      name: null,
      population: null,
      isEdit: false
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
    },
    message() {
      return this.$store.state.message
    }
  },
  methods: {
    deleteCity(id) {
      this.$store.dispatch('deleteCity', id)
    },
    updateCity(id) {
      this.$store.dispatch('updateCity', {
        name: this.name,
        population: this.population,
        id: this.editId
      })
      this.editId = null
      this.name = null
      this.population = null
    },
    setEditId(city) {
      this.editId = city.id
      this.name = city.name
      this.population = city.population
    }
  }
}
</script>

<style>

</style>
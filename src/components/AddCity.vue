<template>
  <form>
    <ErrorMsg v-if="isError" />
    <SuccessMsg v-if="isSuccess" :message="message" />
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input type="text" class="input" name="name" v-model="name">
      </div>
    </div>
    <div class="field">
      <label class="label">Population</label>
      <div class="control">
        <input type="number" class="input" name="population" v-model="population">
      </div>
    </div>
    <div class="control">
      <button class="button is-primary" @click="addCity">Submit</button>
    </div>
  </form>
</template>

<script>
import ErrorMsg from './ErrorMsg.vue'
import SuccessMsg from './SuccessMsg.vue'

export default {
  name: 'add-city',
  components: {
    ErrorMsg,
    SuccessMsg
  },
  data() {
    return {
      name: null,
      population: null,
      message: 'Added city.'
    }
  },
  methods: {
    addCity(e) {
      e.preventDefault()
      if(this.name && this.population) {
        this.$store.dispatch('addCity', { name: this.name, population: this.population })
        this.name = null
        this.population = null
      }
      return
    }
  },
  computed: {
    isError() {
      return this.$store.state.error
    },
    isSuccess() {
      return this.$store.state.success
    }
  }
}
</script>

<style>

</style>
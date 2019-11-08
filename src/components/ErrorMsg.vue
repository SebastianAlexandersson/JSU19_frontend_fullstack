<template>
  <article class="message is-danger">
    <div class="message-header">
      <p>Error!</p>
      <button class="delete" aria-label="delete" @click="closeMsg"></button>
    </div>
    <div class="message-body">
      <strong>Oops! </strong>Something went wrong.
    </div>
  </article>
</template>

<script>
export default {
  name: 'error-msg',
  methods: {
    closeMsg() {
      return this.$store.commit('removeError')
    }
  }
}
</script>

<style>

</style>
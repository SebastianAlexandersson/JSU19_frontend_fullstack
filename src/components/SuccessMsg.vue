<template>
  <article class="message is-success">
    <div class="message-header">
      <p>Success!</p>
      <button class="delete" aria-label="delete" @click="closeMsg"></button>
    </div>
    <div class="message-body">
      {{ message }}
    </div>
  </article>
</template>

<script>
export default {
  name: 'success-msg',
  methods: {
    closeMsg() {
      return this.$store.commit('removeSuccess')
    }
  },
  props: ['message']
}
</script>

<style>

</style>
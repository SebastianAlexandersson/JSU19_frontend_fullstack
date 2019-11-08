import Vue from 'vue'
import VueX from 'vuex'
import logo from '../../static/img/logo.png'

Vue.use(VueX)

export default new VueX.Store({
  state: {
    logo,
    cities: null,
    error: false,
    success: false
  },
  getters: {

  },
  actions: {
    getCities: async (context) => {
      const res = await fetch('http://localhost:5000/api/cities')
      const cities = await res.json()
      context.commit('getCities', await cities)
    },
    deleteCity: async (context, payload) => {
      try {
        const req = await fetch('http://localhost:5000/api/cities?id=' + payload, {
        method: 'DELETE'
        })
        const res = await req
        if(res.status !== 200) {
          throw Error
        } else {
          context.dispatch('getCities')
          context.dispatch('setSuccess')
        }
      } catch(error) {
        context.dispatch('setError')
      }
    },
    addCity: async (context, payload) => {
      try {
        const req = fetch('http://localhost:5000/api/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
        })
        const res = await req
        if(res.status !== 200) {
          throw Error
        } else {
          context.dispatch('getCities')
          context.dispatch('setSuccess')
        }
      } catch(error) {
        context.dispatch('setError')
      }
    },
    setError: (context) => {
      if(context.state.error) {
        return
      }
      context.commit('removeSuccess')
      context.commit('setError')
      setTimeout(() => {
        context.commit('removeError')
      }, 3000);
    },
    setSuccess: (context) => {
      if(context.state.success) {
        return
      }
      context.commit('removeError')
      context.commit('setSuccess')
      setTimeout(() => {
        context.commit('removeSuccess')
      }, 3000);
    }
  },
  mutations: {
    getCities: (state, payload) => state.cities = payload,
    setError: state => state.error = true,
    removeError: state => state.error = false,
    setSuccess: state => state.success = true,
    removeSuccess: state => state.success = false
  }
})
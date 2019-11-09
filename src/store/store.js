import Vue from 'vue'
import VueX from 'vuex'
import logo from '../../static/img/logo.png'

Vue.use(VueX)

export default new VueX.Store({
  state: {
    logo,
    cities: null,
    error: false,
    success: false,
    message: "",
    timeoutId: null
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
          context.dispatch('setSuccess', 'Deleted city.')
        }
      } catch(error) {
        context.dispatch('setError', 'Couldn\'t delete city.')
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
          context.dispatch('setSuccess', 'Added city.')
        }
      } catch(error) {
        context.dispatch('setError', 'Couldn\'t add city.')
      }
    },
    updateCity: async (context, payload) => {
      const { name, population, id } = payload
      try {
        if(!id) {
          throw Error('Missing id.')
        } else if(!name || !population) {
            throw Error('Mising name or population.')
        }
        const req = fetch('http://localhost:5000/api/cities?id=' + id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, population})
        })
        const res = await req
        if(res.status !== 200) {
          throw Error
        } else {
          context.dispatch('getCities')
          context.dispatch('setSuccess', 'Updated city.')
        }
      } catch(error) {
          context.dispatch('setError', 'Couldn\'t update city')
      }
    },
    setError: (context, payload) => {
      if(context.state.error) {
        clearTimeout(context.state.timeoutId)
      }
      context.commit('removeSuccess')
      context.commit('setMessage', payload)
      context.commit('setError')
      const timeoutId = setTimeout(() => {
        context.commit('removeError')
      }, 3000);
      context.commit('setTimeoutId', timeoutId)
    },
    setSuccess: (context, payload) => {
      if(context.state.success) {
        clearTimeout(context.state.timeoutId)
      }
      context.commit('removeError')
      context.commit('setMessage', payload)
      context.commit('setSuccess')
      const timeoutId = setTimeout(() => {
        context.commit('removeSuccess')
      }, 3000);
      context.commit('setTimeoutId', timeoutId)
    }
  },
  mutations: {
    getCities: (state, payload) => state.cities = payload,
    setError: state => state.error = true,
    removeError: state => state.error = false,
    setSuccess: state => state.success = true,
    removeSuccess: state => state.success = false,
    setMessage: (state, payload) => state.message = payload,
    setTimeoutId: (state, payload) => state.timeoutId = payload
  }
})
import Vue from 'vue'
import Router from 'vue-router'
import MainView from '../views/MainView.vue'
import AddCityView from '../views/AddCityView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MainView
    },
    {
      path: '/add-city',
      component: AddCityView
    }
  ]
})
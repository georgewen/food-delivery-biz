import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//import 'bootstrap'; 
//import 'bootstrap/dist/css/bootstrap.min.css';

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// // Install BootstrapVue
// Vue.use(BootstrapVue)
// // Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  // data: {
  //   cart:[]
  // },
  // methods: {
  //   updateCart(id) {
  //     this.cart.push(id)
  //   }
  // }
}).$mount('#app')

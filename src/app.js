import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";

import './assets/sass/style.sass'


//import 'jquery/src/jquery.js'
//import 'bootstrap/dist/js/bootstrap.min.js'

//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'

//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Install BootstrapVue
//Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

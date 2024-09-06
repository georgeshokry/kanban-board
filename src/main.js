import Vue from 'vue'
import App from './App.vue'
import { createPinia, PiniaVuePlugin } from 'pinia';
import VueCompositionAPI from '@vue/composition-api';


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './Style.scss'
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCompositionAPI); 
Vue.use(PiniaVuePlugin); 
const pinia = createPinia();
new Vue({
  pinia,
  render: h => h(App),
}).$mount('#app')

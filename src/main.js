// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import ca from 'vee-validate/dist/locale/ca'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Validator.addLocale(ca)
Vue.use(VeeValidate, { locale: 'ca' })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

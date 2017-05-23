import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import ca from 'vee-validate/dist/locale/ca'

import Main from '@/components/Main'

Validator.addLocale(ca)
Vue.use(VeeValidate, { locale: 'ca' })

describe('Main.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Main)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.main h1').textContent)
      .to.equal("Gestió dels plats d'un àpat")
  })
})

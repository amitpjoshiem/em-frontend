/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import ForgotPassword from '@/components/Login/ForgotPassword.vue'
import ElementPlus from 'element-plus'
import Button from '@/components/Global/Button/Button.vue'
import InlineSvg from 'vue-inline-svg'

let wrapper = null

describe('ForgotPassword component', () => {
  beforeEach(() => {
    const $store = {
      state: {
        auth: {
          sendFormForgotPass: false,
        },
      },
      commit: jest.fn(),
    }
    wrapper = null
    wrapper = mount(ForgotPassword, {
      global: {
        plugins: [ElementPlus],
        components: {
          Button,
          InlineSvg,
        },
        mocks: {
          $store,
        },
      },
    })
  })

  test('Show error if email is invalid', async () => {
    const input = wrapper.find('input')
    await input.setValue('my@mail')
    const form = wrapper.find('form')
    await form.trigger('submit')
  })
})

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import ForgotPassword from '@/components/Login/ForgotPassword.vue'
import ElementPlus from 'element-plus'
import Button from '@/components/Global/Button/Button.vue'
import InlineSvg from 'vue-inline-svg'

let wrapper = null
const mockForgotFunction = jest.fn((params) => {})

jest.mock('@/api/authentication/use-forgot', () => {
  return {
    __esModule: true,
    useForgot: jest.fn(() => {
      return {
        response: [],
        error: false,
        fetching: false,
        forgot: mockForgotFunction,
      }
    }),
  }
})

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

  test('Show error if email is empty', async () => {
    await wrapper.find('form').trigger('submit')

    const itemError = wrapper.find('.el-form-item__error')
    expect(itemError.text()).toBe('Please input email address')
  })

  test('Show error if email is invalid', async () => {
    await wrapper.find('input').setValue('my@mail')
    await wrapper.find('form').trigger('submit')

    const itemError = wrapper.find('.el-form-item__error')
    expect(itemError.text()).toBe('Please input correct email address')
  })

  test('Show error if email is valid', async () => {
    await wrapper.find('input').setValue('my@mail.com')
    await wrapper.find('form').trigger('submit')
    expect(mockForgotFunction).toHaveBeenCalledWith({ email: 'my@mail.com' })
  })
})

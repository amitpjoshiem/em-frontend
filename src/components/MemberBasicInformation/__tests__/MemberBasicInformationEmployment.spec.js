/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import MemberBasicInformationEmployment from '@/components/MemberBasicInformation/MemberBasicInformationEmployment.vue'
import SwdStubForText from '@/components/Global/SwdStubForText.vue'

let wrapper = null

describe('MemberBasicInformationEmployment component', () => {
  beforeEach(() => {
    wrapper = null
    wrapper = mount(MemberBasicInformationEmployment, {
      global: {
        components: {
          SwdStubForText,
        },
      },
    })
  })

  test('Show error if email is empty', async () => {
    console.log(wrapper)
  })

  // test('Show error if email is invalid', async () => {
  //   await wrapper.find('input').setValue('my@mail')
  //   await wrapper.find('form').trigger('submit')

  //   const itemError = wrapper.find('.el-form-item__error')
  //   expect(itemError.text()).toBe('Please input correct email address')
  // })

  // test('Send email is valid', async () => {
  //   await wrapper.find('input').setValue('my@mail.com')
  //   await wrapper.find('form').trigger('submit')
  //   expect(mockForgotFunction).toHaveBeenCalledWith({ email: 'my@mail.com' })
  // })
})

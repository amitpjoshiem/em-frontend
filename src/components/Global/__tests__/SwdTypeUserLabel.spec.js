/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import SwdTypeUserLabel from '@/components/Global/SwdTypeUserLabel.vue'

describe('SwdTypeUserLabel.vue', () => {
  it('renders SwdTypeUserLabel', () => {
    const wrapper = mount(SwdTypeUserLabel, {
      propsData: {
        userType: 'prospect',
      },
    })
    expect(wrapper.props().userType).toBe('prospect')
  })
})

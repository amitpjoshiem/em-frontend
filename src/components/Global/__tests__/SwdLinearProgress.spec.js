/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import SwdLinearProgress from '@/components/Global/SwdLinearProgress.vue'

describe('SwdLinearProgress.vue', () => {
  it('renders SwdLinearProgress', () => {
    const wrapper = mount(SwdLinearProgress, {
      propsData: {
        percentage: 20,
        showText: false,
      },
    })
    expect(wrapper.props().percentage).toBe(20)
    expect(wrapper.props().showText).toBe(false)
  })
})

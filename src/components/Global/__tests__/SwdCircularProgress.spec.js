/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import SwdCircularProgress from '@/components/Global/SwdCircularProgress.vue'

describe('SwdCircularProgress.vue', () => {
  it('renders SwdCircularProgress', () => {
    const wrapper = mount(SwdCircularProgress, {
      propsData: {
        percentage: 20,
        showText: false,
      },
    })
    expect(wrapper.props().percentage).toBe(20)
    expect(wrapper.props().showText).toBe(false)
  })
})

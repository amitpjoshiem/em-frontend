/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import SwdTypeUserLabel from '@/components/Global/SwdTypeUserLabel.vue'

let wrapper = null

describe('SwdTypeUserLabel.vue', () => {
  wrapper = mount(SwdTypeUserLabel, {
    props: {
      userType: 'opportunity',
    },
  })

  test('renders SwdTypeUserLabel prospect', () => {
    expect(wrapper.props().userType).toBe('opportunity')
  })

  test('renders SwdTypeUserLabel prospect type', () => {
    expect(wrapper.find('div').text()).toBe('opportunity')
  })

  test('renders SwdTypeUserLabel client type', async () => {
    await wrapper.setProps({ userType: 'client' })
    expect(wrapper.find('div').text()).toBe('client')
  })
})

/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import SwdStubForText from '@/components/Global/SwdStubForText.vue'

let wrapper = null

describe('SwdStubForText.vue', () => {
  wrapper = mount(SwdStubForText, {
    props: {
      text: 'test-text',
      plug: '---',
    },
  })

  test('renders SwdStubForText', () => {
    expect(wrapper.props().text).toBe('test-text')
    expect(wrapper.props().plug).toBe('---')
  })

  test('renders SwdStubForText with text', async () => {
    expect(wrapper.find('div').text()).toBe('test-text')
  })

  test('renders SwdStubForText no text', async () => {
    await wrapper.setProps({ text: '' })
    expect(wrapper.find('div').text()).toBe('---')
  })
})

/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import EmploymentHistoryItem from '@/components/EmploymentHistory/EmploymentHistoryItem.vue'

let wrapper = null

describe('EmploymentHistoryItem.vue', () => {
  wrapper = mount(EmploymentHistoryItem, {
    props: {
      userType: 'prospect',
    },
  })

  test('renders EmploymentHistoryItem prospect', () => {
    expect(wrapper.props().userType).toBe('prospect')
  })

  // test('renders EmploymentHistoryItem prospect type', () => {
  //   expect(wrapper.find('div').text()).toBe('prospect')
  // })

  // test('renders EmploymentHistoryItem client type', async () => {
  //   await wrapper.setProps({ userType: 'client' })
  //   expect(wrapper.find('div').text()).toBe('client')
  // })
})

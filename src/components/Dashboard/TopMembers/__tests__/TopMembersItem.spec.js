/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import TopMembersItem from '@/components/Dashboard/TopMembers/TopMembersItem.vue'
import SwdTypeUserLabel from '@/components/Global/SwdTypeUserLabel.vue'
import SwdAvatar from '@/components/Global/SwdAvatar.vue'

let wrapper = null

describe('TopMembersItem.vue', () => {
  wrapper = null

  beforeEach(() => {
    wrapper = mount(TopMembersItem, {
      global: {
        components: {
          SwdTypeUserLabel,
          SwdAvatar,
        },
      },
      props: {
        member: {
          amount: '98106.022',
          name: 'Wallace Lemke',
          stage: 'Closed Won',
          type: 'client',
        },
      },
    })
  })

  test('renders TopMembersItem component', () => {
    expect(wrapper.props().member).toEqual({
      amount: '98106.022',
      name: 'Wallace Lemke',
      stage: 'Closed Won',
      type: 'client',
    })
  })

  test('content testing member name', () => {
    expect(wrapper.find('[data-testid="top-members-name"]').text()).toBe('Wallace Lemke')
  })

  test('content testing member type client', () => {
    expect(wrapper.find('[data-testid="top-members-type"]').find('span').text()).toBe('client')
  })

  test('content testing member type prospect', async () => {
    await wrapper.setProps({ member: { type: 'prospect' } })
    expect(wrapper.find('[data-testid="top-members-type"]').find('span').text()).toBe('prospect')
  })

  test('content testing member stage', () => {
    expect(wrapper.find('[data-testid="top-members-stage"]').text()).toBe('Closed Won')
  })

  test('content testing member stage', () => {
    expect(wrapper.find('[data-testid="top-members-currency"]').text()).toBe('$98,106.02')
  })
})

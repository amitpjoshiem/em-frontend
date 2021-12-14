/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import MemberBasicInformationOther from '@/components/MemberBasicInformation/MemberBasicInformationOther.vue'

let wrapper = null

describe('MemberBasicInformationOther.vue', () => {
  wrapper = null

  beforeEach(() => {
    wrapper = mount(MemberBasicInformationOther, {
      props: {
        other: {
          questions: 'March Hare, who had followed him into the roof of the March Hare meekly replied.',
          retirement: 'And how do you call him Tortoise, if he thought it had lost something.',
          retirementMoney: 'Alice began telling them her adventures from the Queen said to Alice;',
          risk: 'aggressive',
          id: 'v6qgy4dowaz0b75l',
        },
      },
    })
  })

  test('renders MemberBasicInformationOther prospect', () => {
    expect(wrapper.props().other).toEqual({
      questions: 'March Hare, who had followed him into the roof of the March Hare meekly replied.',
      retirement: 'And how do you call him Tortoise, if he thought it had lost something.',
      retirementMoney: 'Alice began telling them her adventures from the Queen said to Alice;',
      risk: 'aggressive',
      id: 'v6qgy4dowaz0b75l',
    })
  })

  test('content testing member basic information other risk', () => {
    expect(wrapper.find('[data-testid="member-basic-information-other-risk"]').text()).toBe('aggressive')
  })

  test('content testing member basic information other questions', () => {
    expect(wrapper.find('[data-testid="member-basic-information-other-questions"]').text()).toBe(
      'March Hare, who had followed him into the roof of the March Hare meekly replied.'
    )
  })

  test('content testing member basic information other retirement', () => {
    expect(wrapper.find('[data-testid="member-basic-information-other-retirement"]').text()).toBe(
      'And how do you call him Tortoise, if he thought it had lost something.'
    )
  })

  test('content testing member basic information other retirement money', () => {
    expect(wrapper.find('[data-testid="member-basic-information-other-retirementMoney"]').text()).toBe(
      'Alice began telling them her adventures from the Queen said to Alice;'
    )
  })

  test('content testing member basic information no other', async () => {
    await wrapper.setProps({
      other: {
        id: '',
      },
    })
    expect(wrapper.find('[data-testid="member-basic-information-no-other"]').text()).toBe('No other information')
  })
})

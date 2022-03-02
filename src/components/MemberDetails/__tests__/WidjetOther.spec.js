/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import WidgetOther from '@/components/MemberDetails/WidgetOther.vue'
import ModalMemberDetailsOther from '@/components/MemberDetails/ModalMemberDetailsOther.vue'
import { createStore } from 'vuex'
import ElementPlus from 'element-plus'

let wrapper = null

const store = createStore({
  state: {
    globalComponents: {
      dialog: {
        showDialog: {
          moreOtherInfo: false,
        },
      },
    },
  },
})

describe('WidgetOther.vue', () => {
  wrapper = null

  beforeEach(() => {
    wrapper = mount(WidgetOther, {
      global: {
        components: {
          ModalMemberDetailsOther,
        },
        plugins: [store, ElementPlus],
      },
      props: {
        other: {
          value: {
            risk: 'conservative',
            questions: ' She went on to himself in an encouraging opening for a minute.',
            retirement: "Alice felt dreadfully puzzled. The Hatter's remark seemed to be managed?",
            retirementMoney: "Alice again, in a day is very confusing.' 'It isn't,' said the Mock Turtle. ",
          },
        },
      },
      state: {
        dialogVisible: false,
      },
    })
  })

  test('renders WidgetOther', () => {
    expect(wrapper.props().other).toEqual({
      value: {
        risk: 'conservative',
        questions: ' She went on to himself in an encouraging opening for a minute.',
        retirement: "Alice felt dreadfully puzzled. The Hatter's remark seemed to be managed?",
        retirementMoney: "Alice again, in a day is very confusing.' 'It isn't,' said the Mock Turtle. ",
      },
    })
  })

  test('content testing widjet other risk', () => {
    expect(wrapper.find('[data-testid="widjet-other-risk"]').text()).toBe('conservative')
  })

  test('content testing widjet other risk', () => {
    expect(wrapper.find('[data-testid="widjet-other-retirement"]').text()).toHaveLength(31)
  })

  test('content testing widjet other risk', () => {
    expect(wrapper.find('[data-testid="widjet-other-retirement-money"]').text()).toHaveLength(31)
  })
})

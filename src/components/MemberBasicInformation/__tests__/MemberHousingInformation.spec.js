/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import MemberHousingInformation from '@/components/MemberBasicInformation/MemberHousingInformation.vue'
import SwdStubForText from '@/components/Global/SwdStubForText.vue'
import { MemberDetailsHouse } from '@/dto/Member/MemberDetailsHouse'

let wrapper = null

describe('MemberHousingInformation.vue', () => {
  wrapper = null

  beforeEach(() => {
    wrapper = mount(MemberHousingInformation, {
      global: {
        components: {
          SwdStubForText,
        },
      },
      props: {
        house: new MemberDetailsHouse({
          id: 'v6qgy4dowaz0b75l',
          market_value: '1000.000',
          monthly_payment: '1000.000',
          remaining_mortgage_amount: '1000.000',
          total_debt: '1000.000',
          total_monthly_expenses: '1000.000',
          type: 'family',
        }),
      },
    })
  })

  test('renders MemberHousingInformation prospect', () => {
    expect(wrapper.props().house).toEqual({
      id: 'v6qgy4dowaz0b75l',
      marketValue: '1000.000',
      monthlyPayment: '1000.000',
      remainingMortgageAmount: '1000.000',
      totalDebt: '1000.000',
      totalMonthlyExpenses: '1000.000',
      type: 'family',
    })
  })

  test('content testing member housing information type', () => {
    expect(wrapper.find('[data-testid="member-housing-information-type"]').text()).toBe('family')
  })

  test('content testing member housing information market value', () => {
    expect(wrapper.find('[data-testid="member-housing-information-market-value"]').text()).toBe('$1,000.00')
  })

  test('content testing member housing information total debt', () => {
    expect(wrapper.find('[data-testid="member-housing-information-total-debt"]').find('span').text()).toBe('$1,000.00')
  })

  test('content testing member housing information remaining mortgage amount', () => {
    expect(wrapper.find('[data-testid="member-housing-information-remaining-mortgage-amount"]').text()).toBe(
      '$1,000.00'
    )
  })

  test('content testing member housing information monthly payment', async () => {
    await wrapper.setProps({
      house: {
        id: 'v6qgy4dowaz0b75l',
        type: 'rent',
        monthlyPayment: '1000.000',
        totalMonthlyExpenses: '1000.000',
      },
    })
    expect(wrapper.find('[data-testid="member-housing-information-monthly-payment"]').text()).toBe('$1,000.00')
  })

  test('content testing member housing information total-monthly-expenses', async () => {
    await wrapper.setProps({
      house: {
        id: 'v6qgy4dowaz0b75l',
        type: 'rent',
        monthlyPayment: '1000.000',
        totalMonthlyExpenses: '1000.000',
      },
    })
    expect(wrapper.find('[data-testid="member-housing-information-total-monthly-expenses"]').text()).toBe('$1,000.00')
  })

  test('content testing member housing no information', async () => {
    await wrapper.setProps({
      house: {
        id: '',
      },
    })
    expect(wrapper.find('[data-testid="member-housing-no-information"]').find('span').text()).toBe(
      'No information about housing'
    )
  })
})

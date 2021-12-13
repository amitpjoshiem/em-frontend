/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import EmploymentHistoryItem from '@/components/EmploymentHistory/EmploymentHistoryItem.vue'
import SwdStubForText from '@/components/Global/SwdStubForText.vue'

let wrapper = null

describe('EmploymentHistoryItem.vue', () => {
  wrapper = null

  beforeEach(() => {
    wrapper = mount(EmploymentHistoryItem, {
      global: {
        components: {
          SwdStubForText,
        },
      },
      props: {
        employmentItem: {
          companyName: ['Uinno', 'Engineersmind'],
          occupation: ['FE developer', 'BE developer'],
          years: ['11', '22'],
        },
      },
    })
  })

  test('renders EmploymentHistoryItem prospect', () => {
    expect(wrapper.props().employmentItem).toEqual({
      companyName: ['Uinno', 'Engineersmind'],
      occupation: ['FE developer', 'BE developer'],
      years: ['11', '22'],
    })
  })

  test('content testing member company name', () => {
    expect(wrapper.find('[data-testid="employment-history-companyname-member"]').text()).toBe('Uinno')
  })

  test('content testing spouse company name', () => {
    expect(wrapper.find('[data-testid="employment-history-companyname-spouse"]').text()).toBe('Engineersmind')
  })

  test('content testing member occupation', () => {
    expect(wrapper.find('[data-testid="employment-history-occupation-member"]').text()).toBe('FE developer')
  })

  test('content testing member occupation', () => {
    expect(wrapper.find('[data-testid="employment-history-occupation-spouse"]').text()).toBe('BE developer')
  })

  test('content testing member years', () => {
    expect(wrapper.find('[data-testid="employment-history-years-member"]').text()).toBe('11')
  })

  test('content testing spouse years', () => {
    expect(wrapper.find('[data-testid="employment-history-years-spouse"]').text()).toBe('22')
  })

  test('content testing spouse empty employment-history ', async () => {
    await wrapper.setProps({
      employmentItem: {
        companyName: ['Uinno', ''],
        occupation: ['FE developer', ''],
        years: ['11', ''],
      },
    })

    expect(wrapper.find('[data-testid="employment-history-companyname-spouse"]').text()).toBe('—')
    expect(wrapper.find('[data-testid="employment-history-occupation-spouse"]').text()).toBe('—')
    expect(wrapper.find('[data-testid="employment-history-years-spouse"]').text()).toBe('—')
  })

  test('content testing member empty employment-history ', async () => {
    await wrapper.setProps({
      employmentItem: {
        companyName: ['', 'Uinno'],
        occupation: ['', 'FE developer'],
        years: ['', '11'],
      },
    })

    expect(wrapper.find('[data-testid="employment-history-companyname-member"]').text()).toBe('—')
    expect(wrapper.find('[data-testid="employment-history-occupation-member"]').text()).toBe('—')
    expect(wrapper.find('[data-testid="employment-history-years-member"]').text()).toBe('—')
  })

  // test('content testing member stage', () => {
  //   expect(wrapper.find('[data-testid="top-members-stage"]').text()).toBe('Closed Won')
  // })
})

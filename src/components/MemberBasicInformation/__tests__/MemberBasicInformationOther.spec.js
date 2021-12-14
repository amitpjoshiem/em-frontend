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
          companyName: ['Uinno', 'Engineersmind'],
          occupation: ['FE developer', 'BE developer'],
          years: ['11', '22'],
        },
      },
    })
  })

  test('renders MemberBasicInformationOther prospect', () => {
    expect(wrapper.props().employmentItem).toEqual({
      companyName: ['Uinno', 'Engineersmind'],
      occupation: ['FE developer', 'BE developer'],
      years: ['11', '22'],
    })
  })

  // test('content testing member company name', () => {
  //   expect(wrapper.find('[data-testid="employment-history-companyname-member"]').text()).toBe('Uinno')
  // })

  // test('content testing spouse company name', () => {
  //   expect(wrapper.find('[data-testid="employment-history-companyname-spouse"]').text()).toBe('Engineersmind')
  // })

  // test('content testing member occupation', () => {
  //   expect(wrapper.find('[data-testid="employment-history-occupation-member"]').text()).toBe('FE developer')
  // })

  // test('content testing member occupation', () => {
  //   expect(wrapper.find('[data-testid="employment-history-occupation-spouse"]').text()).toBe('BE developer')
  // })

  // test('content testing member years', () => {
  //   expect(wrapper.find('[data-testid="employment-history-years-member"]').text()).toBe('11')
  // })

  // test('content testing spouse years', () => {
  //   expect(wrapper.find('[data-testid="employment-history-years-spouse"]').text()).toBe('22')
  // })

  // test('content testing spouse empty employment-history ', async () => {
  //   await wrapper.setProps({
  //     employmentItem: {
  //       companyName: ['Uinno', ''],
  //       occupation: ['FE developer', ''],
  //       years: ['11', ''],
  //     },
  //   })

  //   expect(wrapper.find('[data-testid="employment-history-companyname-spouse"]').text()).toBe('—')
  //   expect(wrapper.find('[data-testid="employment-history-occupation-spouse"]').text()).toBe('—')
  //   expect(wrapper.find('[data-testid="employment-history-years-spouse"]').text()).toBe('—')
  // })

  // test('content testing member empty employment-history ', async () => {
  //   await wrapper.setProps({
  //     employmentItem: {
  //       companyName: ['', 'Uinno'],
  //       occupation: ['', 'FE developer'],
  //       years: ['', '11'],
  //     },
  //   })

  //   expect(wrapper.find('[data-testid="employment-history-companyname-member"]').text()).toBe('—')
  //   expect(wrapper.find('[data-testid="employment-history-occupation-member"]').text()).toBe('—')
  //   expect(wrapper.find('[data-testid="employment-history-years-member"]').text()).toBe('—')
  // })
})

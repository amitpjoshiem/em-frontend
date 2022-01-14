/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import MemberBasicInformationEmployment from '@/components/MemberBasicInformation/MemberBasicInformationEmployment.vue'
import { MemberDetailsUser } from '@/dto/Member/MemberDetailsUser'
import { MemberLastEmployment } from '@/dto/Member/MemberLastEmployment'
import { SpouseLastEmployment } from '@/dto/Member/SpouseLastEmployment'
import SwdStubForText from '@/components/Global/SwdStubForText.vue'

let wrapper = null

describe('MemberBasicInformationEmployment.vue', () => {
  wrapper = null

  beforeEach(() => {
    wrapper = mount(MemberBasicInformationEmployment, {
      global: {
        components: {
          SwdStubForText,
        },
      },
      props: {
        prospect: new MemberDetailsUser({
          id: '11111',
        }),
        employmentProspect: new MemberLastEmployment({
          company_name: 'Uinno',
          years: '11',
          occupation: 'FrontEnd developer',
        }),
        employmentSpouse: new SpouseLastEmployment({
          company_name: 'Uinno',
          years: '11',
          occupation: 'FrontEnd developer',
        }),
      },
    })
  })

  test('test props prospect MemberBasicInformationEmployment', () => {
    expect(wrapper.props().prospect).toEqual({
      id: '11111',
    })
  })

  test('test props employmentProspect MemberBasicInformationEmployment', () => {
    expect(wrapper.props().employmentProspect).toEqual({
      companyName: 'Uinno',
      years: '11',
      occupation: 'FrontEnd developer',
    })
  })

  test('test props employmentSpouse MemberBasicInformationEmployment', () => {
    expect(wrapper.props().employmentSpouse).toEqual({
      companyName: 'Uinno',
      years: '11',
      occupation: 'FrontEnd developer',
    })
  })

  test('content testing prospect basic information company name', () => {
    expect(wrapper.find('[data-testid="basic-information-employment-prospect-company-name"]').text()).toBe('Uinno')
  })

  test('content testing spouse basic information company name', () => {
    expect(wrapper.find('[data-testid="basic-information-employment-spouse-company-name"]').text()).toBe('Uinno')
  })

  test('content testing prospect basic information occupation', () => {
    expect(wrapper.find('[data-testid="basic-information-employment-prospect-occupation"]').text()).toBe(
      'FrontEnd developer'
    )
  })

  test('content testing spouse basic information occupation', () => {
    expect(wrapper.find('[data-testid="basic-information-employment-spouse-occupation"]').text()).toBe(
      'FrontEnd developer'
    )
  })

  test('content testing prospect basic information years', () => {
    expect(wrapper.find('[data-testid="basic-information-employment-prospect-years"]').text()).toBe('11')
  })

  test('content testing spouse basic information years', () => {
    expect(wrapper.find('[data-testid="basic-information-employment-spouse-years"]').text()).toBe('11')
  })
})

/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import MemberBasicInformationGeneral from '@/components/MemberBasicInformation/MemberBasicInformationGeneral.vue'
import SwdStubForText from '@/components/Global/SwdStubForText.vue'
import { MemberDetailsUser } from '@/dto/Member/MemberDetailsUser'
import { MemberDetailsSpouse } from '@/dto/Member/MemberDetailsSpouse'

let wrapper = null

describe('MemberBasicInformationGeneral.vue', () => {
  wrapper = null

  beforeEach(() => {
    wrapper = mount(MemberBasicInformationGeneral, {
      global: {
        components: {
          SwdStubForText,
        },
      },
      props: {
        prospect: new MemberDetailsUser({
          name: 'Joelle Walter',
          phone: '(500) 857-9631',
          email: 'sven.bailey@jacobi.com',
          birthday: '1930-10-26',
          retired: true,
          retirement_date: '2018-07-27',
          address: '99438 Mueller Unions Suite 316\nSouth Davon, WV 44058-4201',
          married: true,
        }),
        spouse: new MemberDetailsSpouse({
          name: 'Wilfrid Hayes',
          phone: '(798) 212-0914',
          email: 'kmcglynn@langosh.com',
          birthday: '1955-11-15',
          retired: true,
          retirement_date: '2018-07-27',
          address: '99438 Mueller Unions Suite 316\nSouth Davon, WV 44058-4201',
        }),
      },
    })
  })

  test('renders MemberBasicInformationGeneral prospect', () => {
    expect(wrapper.props().prospect).toEqual({
      name: 'Joelle Walter',
      phone: '(500) 857-9631',
      email: 'sven.bailey@jacobi.com',
      birthday: '1930-10-26',
      retired: true,
      retirementDate: '2018-07-27',
      address: '99438 Mueller Unions Suite 316\nSouth Davon, WV 44058-4201',
      married: true,
    })
  })

  test('renders MemberBasicInformationGeneral spouse', () => {
    expect(wrapper.props().spouse).toEqual({
      name: 'Wilfrid Hayes',
      phone: '(798) 212-0914',
      email: 'kmcglynn@langosh.com',
      birthday: '1955-11-15',
      retired: true,
      retirementDate: '2018-07-27',
      address: '99438 Mueller Unions Suite 316\nSouth Davon, WV 44058-4201',
    })
  })

  test('content testing member basic information general prospect name', () => {
    expect(wrapper.find('[data-testid="member-basic-information-prospect-name"]').text()).toBe('Joelle Walter')
  })

  test('content testing member basic information general prospect phone', () => {
    expect(wrapper.find('[data-testid="member-basic-information-prospect-phone"]').text()).toBe('(500) 857-9631')
  })

  test('content testing member basic information general prospect emeil', () => {
    expect(wrapper.find('[data-testid="member-basic-information-prospect-emeil"]').text()).toBe(
      'sven.bailey@jacobi.com'
    )
  })

  test('content testing member basic information general prospect emeil', () => {
    expect(wrapper.find('[data-testid="member-basic-information-prospect-birthday"]').text()).toBe('10/26/1930')
  })

  test('content testing member basic information general prospect retirement date', () => {
    expect(wrapper.find('[data-testid="member-basic-information-prospect-retirement-date"]').text()).toBe('07/27/2018')
  })

  test('content testing member basic information general prospect address', () => {
    expect(wrapper.find('[data-testid="member-basic-information-prospect-address"]').text()).toBe(
      '99438 Mueller Unions Suite 316\nSouth Davon, WV 44058-4201'
    )
  })

  test('content testing member basic information general spouse name', () => {
    expect(wrapper.find('[data-testid="member-basic-information-spouse-name"]').text()).toBe('Wilfrid Hayes')
  })

  test('content testing member basic information general spouse phone', () => {
    expect(wrapper.find('[data-testid="member-basic-information-spouse-phone"]').text()).toBe('(798) 212-0914')
  })

  test('content testing member basic information general spouse emeil', () => {
    expect(wrapper.find('[data-testid="member-basic-information-spouse-emeil"]').text()).toBe('kmcglynn@langosh.com')
  })

  test('content testing member basic information general spouse emeil', () => {
    expect(wrapper.find('[data-testid="member-basic-information-spouse-birthday"]').text()).toBe('11/15/1955')
  })

  test('content testing member basic information general spouse retirement date', () => {
    expect(wrapper.find('[data-testid="member-basic-information-spouse-retirement-date"]').text()).toBe('07/27/2018')
  })

  test('type member testing basic information general prospect', () => {
    expect(wrapper.find('[data-testid="type-member-basic-information-prospect-retired"]').text()).toBe('Retired')
  })

  test('type member testing basic information general prospect', async () => {
    await wrapper.setProps({
      prospect: {
        retired: false,
      },
    })
    expect(wrapper.find('[data-testid="type-member-basic-information-prospect-not-retired"]').text()).toBe(
      'Not Retired'
    )
  })

  test('type member testing basic information general spouse', () => {
    expect(wrapper.find('[data-testid="type-member-basic-information-spouse-retired"]').text()).toBe('Retired')
  })
})

import Input from '@/components/Global/Input/Input.vue'
import Radio from '@/components/Global/Radio.vue'
import Label from '@/components/Global/Label.vue'
import TextArea from '@/components/Global/TextArea.vue'

const prospectBasicSchemaGeneral = [
  [
    {
      component: Radio,
      optionOne: 'Yes',
      optionTwo: 'No',
      class: 'w-5/24',
      label: 'Retired?',
    },
    {
      component: Radio,
      optionOne: 'Yes',
      optionTwo: 'No',
      class: 'w-5/24',
      label: 'Married?',
    },
  ],
  [
    {
      component: Input,
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter prospect’s first name',
      name: 'firstName',
      class: 'w-5/12 pr-5',
    },
    {
      component: Input,
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter prospect’s last name',
      name: 'lastName',
      class: 'w-5/12  pr-5',
    },
    {
      component: Input,
      label: 'Date of birth',
      type: 'text',
      placeholder: 'Date of birth',
      name: 'lastName',
      class: 'w-2/12',
    },
  ],
  [
    {
      component: Input,
      label: 'Email',
      type: 'email',
      placeholder: 'Enter prospect’s e-mail',
      name: 'email',
      class: 'w-5/12 pr-5',
    },
    {
      component: Input,
      label: 'Phone',
      type: 'text',
      placeholder: 'Enter prospect’s phone number',
      name: 'phone',
      class: 'w-5/12  pr-5',
    },
    {
      component: Input,
      label: 'Retiretment date',
      type: 'text',
      placeholder: 'Date of birth',
      name: 'lastName',
      class: 'w-2/12',
    },
  ],
  [
    {
      component: Input,
      label: 'Address',
      type: 'text',
      placeholder: 'Enter prospect’s adress',
      name: 'address',
      class: 'w-5/12 pr-5',
    },
    {
      component: Input,
      label: 'City/State',
      type: 'text',
      placeholder: 'Choose option',
      name: 'city',
      class: 'w-5/12  pr-5',
    },
    {
      component: Input,
      label: 'ZIP',
      type: 'text',
      placeholder: '00000',
      name: 'zip',
      class: 'w-2/12',
    },
  ],
]

const prospectBasicSchemaSpouse = [
  [
    {
      component: Radio,
      optionOne: 'Yes',
      optionTwo: 'No',
      class: 'w-5/24',
      label: 'Retired?',
    },
  ],
  [
    {
      component: Input,
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter prospect’s first name',
      name: 'firstName',
      class: 'w-5/12 pr-5',
    },
    {
      component: Input,
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter prospect’s last name',
      name: 'lastName',
      class: 'w-5/12  pr-5',
    },
    {
      component: Input,
      label: 'Date of birth',
      type: 'text',
      placeholder: 'Date of birth',
      name: 'lastName',
      class: 'w-2/12',
    },
  ],
  [
    {
      component: Input,
      label: 'Email',
      type: 'email',
      placeholder: 'Enter prospect’s e-mail',
      name: 'email',
      class: 'w-5/12 pr-5',
    },
    {
      component: Input,
      label: 'Phone',
      type: 'text',
      placeholder: 'Enter prospect’s phone number',
      name: 'phone',
      class: 'w-5/12  pr-5',
    },
    {
      component: Input,
      label: 'Retiretment date',
      type: 'text',
      placeholder: 'Date of birth',
      name: 'retiretment',
      class: 'w-2/12',
    },
  ],
]

const prospectBasicSchemaHousing = [
  [
    {
      component: Radio,
      optionOne: 'Own',
      optionTwo: 'Rent',
      optionThree: 'Live with family',
      class: 'flex items-center pt-2.5 w-10/24',
    },
    {
      component: Input,
      label: 'Market value',
      type: 'text',
      placeholder: '$123000',
      name: 'market',
      class: 'w-5/12 pr-5',
    },
  ],
  [
    {
      component: Input,
      label: 'Total debt',
      type: 'text',
      placeholder: '123000',
      name: 'total',
      class: 'w-5/12 pr-5',
    },
    {
      component: Input,
      label: 'Remaining mortgage amount',
      type: 'text',
      placeholder: '123000',
      name: 'Remaining',
      class: 'w-5/12  pr-5',
    },
  ],
  [
    {
      component: Input,
      label: 'Monthly payment',
      type: 'text',
      placeholder: '123000',
      name: 'Monthly',
      class: 'w-5/12 pr-5',
    },
    {
      component: Input,
      label: 'Total monthly expences',
      type: 'text',
      placeholder: '123000',
      name: 'Total',
      class: 'w-5/12  pr-5',
    },
  ],
]

const prospectBasicSchemaEmployment = [
  [
    {
      component: Label,
      label: 'Contact prospect',
      class: 'w-5/12 pr-5',
    },
  ],
  [
    {
      component: Input,
      label: 'Company name',
      type: 'text',
      placeholder: 'Enter company name',
      name: 'company',
      class: 'w-5/12 pr-5',
    },
    {
      component: Input,
      label: 'Occupation',
      type: 'text',
      placeholder: 'Company occupation',
      name: 'occupation',
      class: 'w-5/12  pr-5',
    },
    {
      component: Input,
      label: 'Years',
      type: 'text',
      placeholder: '00',
      name: 'Years',
      class: 'w-2/12',
    },
  ],
  [
    {
      component: Label,
      label: 'Spouse',
      class: 'w-5/12 pr-5',
    },
  ],
  [
    {
      component: Input,
      label: 'Company name',
      type: 'text',
      placeholder: 'Enter company name',
      name: 'company',
      class: 'w-5/12 pr-5',
    },
    {
      component: Input,
      label: 'Occupation',
      type: 'text',
      placeholder: 'Company occupation',
      name: 'occupation',
      class: 'w-5/12  pr-5',
    },
    {
      component: Input,
      label: 'Years',
      type: 'text',
      placeholder: '00',
      name: 'Years',
      class: 'w-2/12',
    },
  ],
]

const prospectBasicSchemaOther = [
  [
    {
      component: Radio,
      optionOne: 'Conservative',
      optionTwo: 'Moderately Conservative',
      optionThre: 'Moderate',
      optionFour: 'Moderately Aggressive',
      optionFive: 'Aggressive',
      class: 'w-24/24',
      label: 'Risk tolerance??',
    },
  ],

  [
    {
      component: TextArea,
      label: 'Does the prospect have any specific questions to discuss?',
      type: 'text',
      name: 'company',
      class: 'w-12/12 pr-5',
    },
  ],
  [
    {
      component: Label,
      label: 'Spouse',
      class: 'w-5/12 pr-5',
    },
  ],
  [
    {
      component: Input,
      label: 'Company name',
      type: 'text',
      placeholder: 'Enter company name',
      name: 'company',
      class: 'w-5/12 pr-5',
    },
    {
      component: Input,
      label: 'Occupation',
      type: 'text',
      placeholder: 'Company occupation',
      name: 'occupation',
      class: 'w-5/12  pr-5',
    },
    {
      component: Input,
      label: 'Years',
      type: 'text',
      placeholder: '00',
      name: 'Years',
      class: 'w-2/12',
    },
  ],
]

export {
  prospectBasicSchemaGeneral,
  prospectBasicSchemaSpouse,
  prospectBasicSchemaHousing,
  prospectBasicSchemaEmployment,
  prospectBasicSchemaOther,
}

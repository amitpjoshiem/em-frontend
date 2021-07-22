import SchemaSeparator from '@/components/NewProspect/SchemaSeparator.vue'
import SchemaLabel from '@/components/NewProspect/SchemaLabel.vue'

const prospectBasicSchemaGeneral = [
  [
    {
      component: 'RadioBoolean',
      class: 'w-5/24',
      labelGroup: 'Retired?',
      name: 'retired',
      model: 'retired',
      type: 'Boolean',
    },
    {
      component: 'RadioBoolean',
      class: 'w-5/24',
      labelGroup: 'Married?',
      name: 'married',
      model: 'married',
      type: 'Boolean',
    },
  ],
  [
    {
      component: 'Input',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter prospect’s first name',
      name: 'first_name',
      model: 'first_name',
      class: 'w-5/12 pr-5',
      validations: (value) => value && value.length > 3,
    },
    {
      component: 'Input',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter prospect’s last name',
      name: 'last_name',
      model: 'last_name',
      class: 'w-5/12  pr-5',
    },
    {
      component: 'DatePicker',
      model: 'birthday',
      name: 'birthday',
      label: 'Date of birth',
      class: 'w-2/12',
    },
  ],
  [
    {
      component: 'Input',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter prospect’s e-mail',
      name: 'email',
      model: 'email',
      class: 'w-5/12 pr-5',
    },
    {
      component: 'Input',
      label: 'Phone',
      type: 'tel',
      placeholder: 'Enter prospect’s phone number',
      name: 'phone',
      model: 'phone',
      class: 'w-5/12  pr-5',
      isMask: true,
    },

    {
      component: 'DatePicker',
      model: 'retiretmentDate',
      label: 'Retiretment date',
      class: 'w-2/12',
    },
  ],
  [
    {
      component: 'Input',
      label: 'Address',
      type: 'text',
      placeholder: 'Enter prospect’s adress',
      name: 'address',
      model: 'address',
      class: 'w-5/12 pr-5',
    },
    {
      component: 'Input',
      label: 'City/State',
      type: 'text',
      placeholder: 'Choose option',
      name: 'city',
      model: 'city',
      class: 'w-5/12  pr-5',
    },
    {
      component: 'Input',
      label: 'ZIP',
      type: 'number',
      placeholder: '00000',
      name: 'zip',
      model: 'zip',
      class: 'w-2/12',
    },
  ],
]

const prospectBasicSchemaSpouse = [
  [
    {
      component: 'Radio',
      optionOne: 'Yes',
      optionTwo: 'No',
      class: 'w-5/24',
      name: 'retired',
      model: 'retired',
      labelGroup: 'Retired?',
    },
  ],
  [
    {
      component: 'Input',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter prospect’s first name',
      name: 'firstNameSpouse',
      model: 'firstNameSpouse',
      class: 'w-5/12 pr-5',
    },
    {
      component: 'Input',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter prospect’s last name',
      name: 'lastNameSpouse',
      model: 'lastNameSpouse',
      class: 'w-5/12  pr-5',
    },
    {
      component: 'DatePicker',
      model: 'dateofbirthSpose',
      label: 'Date of birth',
      class: 'w-2/12',
    },
  ],
  [
    {
      component: 'Input',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter prospect’s e-mail',
      name: 'emailSpouse',
      model: 'emailSpouse',
      class: 'w-5/12 pr-5',
    },
    {
      component: 'Input',
      label: 'Phone',
      type: 'tel',
      placeholder: 'Enter prospect’s phone number',
      name: 'phoneSpouse',
      model: 'phoneSpouse',
      class: 'w-5/12  pr-5',
      isMask: true,
    },
    {
      component: 'DatePicker',
      model: 'dateretiretmentSpouse',
      label: 'Retiretment date',
      class: 'w-2/12',
    },
  ],
]

const prospectBasicSchemaHousing = [
  [
    {
      component: 'Radio',
      optionOne: 'Own',
      optionTwo: 'Rent',
      name: 'liveHousing',
      model: 'liveHousing',
      optionThree: 'Live with family',
      class: 'flex items-center pt-2.5 w-10/24',
    },
    {
      component: 'Input',
      label: 'Market value',
      type: 'number',
      name: 'marketHousing',
      placeholder: '$123000',
      class: 'w-5/12 pr-5',
      model: 'marketHousing',
    },
  ],
  [
    {
      component: 'Input',
      label: 'Total debt',
      type: 'number',
      placeholder: '123000',
      name: 'total',
      model: 'total',
      class: 'w-5/12 pr-5',
    },
    {
      component: 'Input',
      label: 'Remaining mortgage amount',
      type: 'number',
      placeholder: '123000',
      name: 'Remaining',
      model: 'Remaining',
      class: 'w-5/12  pr-5',
    },
  ],
  [
    {
      component: 'Input',
      label: 'Monthly payment',
      type: 'number',
      placeholder: '123000',
      name: 'Monthly',
      model: 'Monthly',
      class: 'w-5/12 pr-5',
    },
    {
      component: 'Input',
      label: 'Total monthly expences',
      type: 'number',
      placeholder: '123000',
      name: 'Total',
      model: 'Total',
      class: 'w-5/12  pr-5',
    },
  ],
]

const prospectBasicSchemaEmployment = [
  [
    {
      component: 'Label',
      label: 'Contact prospect',
      class: 'w-5/12 pr-5 text-gray03',
      model: 'contactModel',
    },
  ],
  [
    {
      component: 'Input',
      label: 'Company name',
      type: 'text',
      placeholder: 'Enter company name',
      name: 'company',
      model: 'company',
      class: 'w-5/12 pr-5',
    },
    {
      component: 'Input',
      label: 'Occupation',
      type: 'text',
      placeholder: 'Company occupation',
      name: 'occupation',
      model: 'occupation',
      class: 'w-5/12  pr-5',
    },
    {
      component: 'Input',
      label: 'Years',
      type: 'text',
      placeholder: '00',
      name: 'Years',
      model: 'Years',
      class: 'w-2/12',
    },
  ],
  [
    {
      component: 'Label',
      label: 'Spouse',
      class: 'w-5/12 pr-5  text-gray03',
      model: 'sposeLabel',
    },
  ],
  [
    {
      component: 'Input',
      label: 'Company name',
      type: 'text',
      placeholder: 'Enter company name',
      name: 'companyName',
      model: 'companyName',
      class: 'w-5/12 pr-5',
    },
    {
      component: 'Input',
      label: 'Occupation',
      type: 'text',
      placeholder: 'Company occupation',
      name: 'occupationCompany',
      model: 'occupationCompany',
      class: 'w-5/12  pr-5',
    },
    {
      component: 'Input',
      label: 'Years',
      type: 'text',
      placeholder: '00',
      name: 'YearsCompany',
      model: 'YearsCompany',
      class: 'w-2/12',
    },
  ],
]

const prospectBasicSchemaOther = [
  [
    {
      component: 'Radio',
      optionOne: 'Conservative',
      optionTwo: 'Moderately Conservative',
      optionThree: 'Moderate',
      optionFour: 'Moderately Aggressive',
      optionFive: 'Aggressive',
      class: 'w-24/24',
      labelGroup: 'Risk tolerance?',
      model: 'risk',
    },
  ],

  [
    {
      component: 'TextArea',
      label: 'Does the prospect have any specific questions to discuss?',
      type: 'textarea',
      name: 'companyOther',
      model: 'companyOther',
      placeholder: '',
      class: 'w-full',
      rows: 4,
    },
  ],
  [
    {
      component: 'TextArea',
      label: 'Goal for retiretment',
      type: 'textarea',
      name: 'companyretiretment',
      model: 'companyretiretment',
      placeholder: '',
      class: 'w-full',
      rows: 4,
    },
  ],
  [
    {
      component: 'TextArea',
      label: 'Goal for retiretment money',
      type: 'textarea',
      placeholder: '',
      name: 'doesTheProspect',
      model: 'doesTheProspect',
      class: 'w-full',
      rows: 4,
    },
  ],
  [
    {
      component: 'Radio',
      optionOne: 'Yes',
      optionTwo: 'No',
      class: 'w-15/24',
      name: 'prospectCurrently',
      model: 'prospectCurrently',
      labelGroup: 'Does the prospect currently work with the advisor??',
    },
  ],
]

const shemaBasic = [
  ...prospectBasicSchemaGeneral,
  [
    {
      component: SchemaSeparator,
      model: 'separatorSpouse',
    },
  ],
  [
    {
      component: SchemaLabel,
      model: 'labelSpouse',
      label: 'Spouse',
    },
  ],
  ...prospectBasicSchemaSpouse,
  [
    {
      component: SchemaSeparator,
      model: 'separatorHousing',
    },
  ],
  [
    {
      component: SchemaLabel,
      model: 'labelHousing',
      label: 'Housing',
    },
  ],
  ...prospectBasicSchemaHousing,
  [
    {
      component: SchemaSeparator,
      model: 'separatorEmploymentHistory',
    },
  ],
  [
    {
      component: SchemaLabel,
      model: 'labelEmploymentHistory',
      label: 'Employment history',
    },
  ],
  ...prospectBasicSchemaEmployment,
  [
    {
      component: SchemaSeparator,
      model: 'separatorOther',
    },
  ],
  [
    {
      component: SchemaLabel,
      model: 'labelOther',
      label: 'Other',
    },
  ],
  ...prospectBasicSchemaOther,
]

export { shemaBasic }

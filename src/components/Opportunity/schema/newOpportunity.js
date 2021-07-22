// import SchemaSeparator from '@/components/NewProspect/SchemaSeparator.vue'
// import SchemaLabel from '@/components/NewProspect/SchemaLabel.vue'

// import * as yup from 'yup'

const newOpportinitySchema = [
  [
    {
      component: 'Input',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter prospect’s first name',
      name: 'first_name',
      model: 'first_name',
      class: 'w-5/12 pr-5',
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

const schemaOpportunity = [...newOpportinitySchema]

export { schemaOpportunity }

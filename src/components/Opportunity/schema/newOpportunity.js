import * as yup from 'yup'

const newOpportunitySchema = [
  [
    {
      component: 'InputText',
      label: 'Opportunity owner*',
      type: 'text',
      placeholder: 'Enter Opportunity owner',
      name: 'opportunity_owner',
      model: 'opportunity_owner',
      class: 'w-5/12 pr-5',
      disabled: true,
    },
    {
      component: 'SwdSelect',
      label: 'Stage*',
      type: 'text',
      name: 'stage_name',
      model: 'stage_name',
      class: 'w-5/12 pr-5',
      options: [],
    },
    {
      component: 'DatePicker',
      model: 'close_date',
      name: 'close_date',
      label: 'Closed date*',
      class: 'w-2/12',
    },
  ],
  [
    {
      component: 'InputText',
      label: 'Opportunity name*',
      type: 'text',
      placeholder: 'Enter Opportunity name',
      name: 'name',
      model: 'name',
      class: 'w-6/12 pr-2',
      validations: yup.string().min(2).max(100).required(),
    },
    {
      component: 'InputText',
      label: 'Account name*',
      type: 'text',
      placeholder: 'Enter Account name',
      name: 'account_name',
      model: 'account_name',
      class: 'w-6/12 pl-2',
      disabled: true,
    },
  ],
  [
    {
      component: 'SwdSelect',
      label: 'Type*',
      type: 'text',
      name: 'type',
      model: 'type',
      class: 'w-6/12 pr-5',
      options: [],
    },
    {
      component: 'InputText',
      label: 'Amount*',
      type: 'number',
      placeholder: 'Amount',
      name: 'amount',
      model: 'amount',
      class: 'w-6/12',
      validations: yup.number().required(),
    },
  ],
]

const schemaOpportunity = [...newOpportunitySchema]

export { schemaOpportunity }

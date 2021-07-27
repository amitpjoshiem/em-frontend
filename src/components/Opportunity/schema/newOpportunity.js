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
      name: 'opportunity_name',
      model: 'opportunity_name',
      class: 'w-6/12 pr-2',
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
      component: 'InputText',
      label: 'Probability percentage*',
      type: 'number',
      placeholder: 'Probability percentage',
      name: 'probability_percentage',
      model: 'probability_percentage',
      class: 'w-3/12 pr-2',
    },
    {
      component: 'InputText',
      label: 'Amount*',
      type: 'number',
      placeholder: 'Amount',
      name: 'amount',
      model: 'amount',
      class: 'w-3/12',
    },
  ],
  [
    {
      component: 'InputText',
      label: 'Description*',
      type: 'text',
      placeholder: 'Description',
      name: 'description',
      model: 'description',
      class: 'w-full',
    },
  ],
]

const schemaOpportunity = [...newOpportunitySchema]

export { schemaOpportunity }

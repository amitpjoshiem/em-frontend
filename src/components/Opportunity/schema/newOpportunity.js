// import SchemaSeparator from '@/components/NewProspect/SchemaSeparator.vue'
// import SchemaLabel from '@/components/NewProspect/SchemaLabel.vue'

// import * as yup from 'yup'

const newOpportunitySchema = [
  [
    {
      component: 'RadioBoolean',
      class: 'w-5/24',
      labelGroup: 'Married?',
      name: 'opportunity_married',
      model: 'opportunity_married',
      type: 'Boolean',
    },
  ],
  [
    {
      component: 'Input',
      label: 'Opportunity owner',
      type: 'text',
      placeholder: 'Enter Opportunity owner',
      name: 'opportunity_owner',
      model: 'opportunity_owner',
      class: 'w-5/12 pr-5',
    },
    {
      component: 'SwdSelect',
      label: 'Stage',
      type: 'text',
      name: 'stage',
      model: 'stage',
      class: 'w-5/12 pr-5',
      options: [
        {
          title: 'All',
          command: 'all',
        },
        {
          title: 'Clients',
          command: 'clients',
        },
        {
          title: 'Prospect',
          command: 'prospect',
        },
      ],
    },
    {
      component: 'DatePicker',
      model: 'closed_date',
      name: 'closed_date',
      label: 'Closed date',
      class: 'w-2/12',
    },
  ],
  [
    {
      component: 'Input',
      label: 'Opportunity name',
      type: 'text',
      placeholder: 'Enter Opportunity name',
      name: 'opportunity_name',
      model: 'opportunity_name',
      class: 'w-6/12 pr-2',
    },
    {
      component: 'Input',
      label: 'Account name',
      type: 'text',
      placeholder: 'Enter Account name',
      name: 'account_name',
      model: 'account_name',
      class: 'w-6/12 pl-2',
    },
  ],
  [
    {
      component: 'Input',
      label: 'Address',
      type: 'text',
      placeholder: 'Enter opportunity adress',
      name: 'opportunity_address',
      model: 'opportunity_address',
      class: 'w-5/12 pr-5',
    },
    {
      component: 'Input',
      label: 'City/State',
      type: 'text',
      placeholder: 'Choose option',
      name: 'opportunity_city',
      model: 'opportunity_city',
      class: 'w-5/12  pr-5',
    },
    {
      component: 'Input',
      label: 'ZIP',
      type: 'number',
      placeholder: '00000',
      name: 'opportunity_zip',
      model: 'opportunity_zip',
      class: 'w-2/12',
    },
  ],
  [
    {
      component: 'Input',
      label: 'System Information',
      type: 'text',
      placeholder: 'System Information',
      name: 'system_information',
      model: 'system_information',
      class: 'w-9/12 pr-2',
    },
    {
      component: 'Input',
      label: 'Probability percentage',
      type: 'number',
      placeholder: 'Probability percentage',
      name: 'probability_percentage',
      model: 'probability_percentage',
      class: 'w-3/12 pl-2',
    },
  ],
]

const schemaOpportunity = [...newOpportunitySchema]

export { schemaOpportunity }

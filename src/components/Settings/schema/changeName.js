import * as yup from 'yup'

const schemaChangeName = [
  [
    {
      component: 'Input',
      label: 'First name',
      type: 'text',
      placeholder: 'Enter first name',
      name: 'first_name',
      model: 'first_name',
      class: 'w-full',
      validations: yup.string().required(),
    },
  ],
  [
    {
      component: 'Input',
      label: 'Last name',
      type: 'text',
      placeholder: 'Enter last name',
      name: 'last_name',
      model: 'last_name',
      class: 'w-full',
      validations: yup.string().required(),
    },
  ],
]

export { schemaChangeName }

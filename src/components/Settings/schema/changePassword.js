import * as yup from 'yup'

const schemaChangePassword = [
  [
    {
      component: 'Input',
      label: 'Сurrent password*',
      type: 'password',
      placeholder: 'Enter current password',
      name: 'current_password',
      model: 'current_password',
      class: 'w-full',
      validations: yup.string().required(),
    },
  ],
  [
    {
      component: 'Input',
      label: 'Password*',
      type: 'password',
      placeholder: 'Enter password',
      name: 'password',
      model: 'password',
      class: 'w-full',
      validations: yup.string().required(),
    },
  ],
  [
    {
      component: 'Input',
      label: 'Confirm Password*',
      type: 'password',
      placeholder: 'Enter password confirma',
      name: 'password_confirmation',
      model: 'password_confirmation',
      class: 'w-full',
      validations: yup.string().required(),
    },
  ],
]

export { schemaChangePassword }

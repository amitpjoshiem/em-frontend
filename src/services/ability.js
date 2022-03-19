import { defineAbility } from '@casl/ability'

export default defineAbility((can) => {
  can('create', 'Post')
})

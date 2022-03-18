// import { defineAbility } from '@casl/ability'

// export default (user) =>
//   defineAbility((can) => {
//     can('read', 'Article')

//     if (user.isLoggedIn) {
//       can('update', 'Article', { authorId: user.id })
//       can('create', 'Comment')
//       can('update', 'Comment', { authorId: user.id })
//     }
//   })

// import { AbilityBuilder, Ability } from '@casl/ability'

// export default function defineAbilityFor(user) {
//   console.log('user - ', user)
//   const { can, rules } = new AbilityBuilder(Ability)

//   can('read', 'Article')
//   can('update', 'Article', ['title', 'description'], { authorId: user.id })

//   if (user.isModerator) {
//     can('update', 'Article', ['published'])
//   }

//   return new Ability(rules)
// }

import { defineAbility } from '@casl/ability'

export default defineAbility((can) => {
  can('read', 'Post')
  can('update', 'Post')
  can('read', 'Comment')
  can('update', 'Comment')
})

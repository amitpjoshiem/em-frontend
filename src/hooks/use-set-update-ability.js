import { AbilityBuilder, Ability } from '@casl/ability'
import ability from '../services/ability'
import store from '@/store'

export function useSetUpdateAbility() {
  const setUpdateAbility = () => {
    const role = store.state.globalComponents.role
    const { can, rules } = new AbilityBuilder(Ability)

    if (role === 'advisor') {
      can('advisor', 'all')
      can('advisor', 'update')
      can('advisor', 'read')
    }

    if (role === 'client') {
      can('client', 'all')
      can('client', 'update')
      can('client', 'read')
    }

    if (role === 'superadmin') {
      can('superadmin', 'all')
      can('superadmin', 'update')
      can('superadmin', 'read')
    }

    if (role === 'ceo') {
      can('ceo', 'all')
      can('ceo', 'update')
      can('ceo', 'read')
    }

    ability.update(rules)
  }
  return { setUpdateAbility }
}

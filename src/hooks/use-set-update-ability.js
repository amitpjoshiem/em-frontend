import { useStore } from 'vuex'
import { computed } from 'vue'
import { AbilityBuilder, Ability } from '@casl/ability'
import ability from '../services/ability'

export function useSetUpdateAbility() {
  const store = useStore()
  const role = computed(() => store.state.auth.role)

  const setUpdateAbility = () => {
    const { can, rules } = new AbilityBuilder(Ability)

    if (role.value === 'advisor') {
      can('advisor', 'all')
      can('advisor', 'update')
      can('advisor', 'read')
    }

    if (role.value === 'client') {
      can('client', 'all')
      can('client', 'update')
      can('client', 'read')
    }

    if (role.value === 'superadmin') {
      can('superadmin', 'all')
      can('superadmin', 'update')
      can('superadmin', 'read')
    }

    if (role.value === 'ceo') {
      can('ceo', 'all')
      can('ceo', 'update')
      can('ceo', 'read')
    }

    ability.update(rules)
  }
  return { setUpdateAbility }
}

import { useStore } from 'vuex'
import { computed } from 'vue'
import { AbilityBuilder, Ability } from '@casl/ability'
import ability from '../services/ability'

export function useSetUpdateAbility() {
  const store = useStore()
  const role = computed(() => store.state.auth.role)

  const setUpdateAbility = () => {
    const { can, rules } = new AbilityBuilder(Ability)

    if (role.value === 'advisor' || role.value === 'admin') {
      can('advisor', 'all')
      can('advisor', 'update')
      can('advisor', 'read')
    } else {
      can('client', 'all')
      can('client', 'update')
      can('client', 'read')
    }

    ability.update(rules)
  }
  return { setUpdateAbility }
}

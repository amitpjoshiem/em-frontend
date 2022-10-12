import { useRouter } from 'vue-router'

export function useRoutRedirect() {
  const router = useRouter()

  const routRedirect = async ({ role, userId }) => {
    if (role === 'advisor') router.push({ name: 'advisor-dashboard' })
    if (role === 'lead') router.push({ name: 'lead-dashboard' })
    if (role === 'admin') router.push({ name: 'admin-dashboard' })
    if (role === 'ceo') router.push({ name: 'ceo-dashboard' })
    if (role === 'assistant') router.push({ name: 'advisor-dashboard' })
    if (role === 'client') router.push({ name: `client/member-details`, params: { id: userId } })
  }
  return { routRedirect }
}

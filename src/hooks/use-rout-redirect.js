import router from '../router/index'

export function useRoutRedirect() {
  const routRedirect = async ({ role, userId }) => {
    if (role === 'advisor') router.push({ name: 'advisor/dashboard' })
    if (role === 'lead') router.push({ name: 'lead/dashboard' })
    if (role === 'admin') router.push({ name: 'admin/dashboard' })
    if (role === 'ceo') router.push({ name: 'ceo/dashboard' })
    if (role === 'assistant') router.push({ name: 'advisor/dashboard' })
    if (role === 'support') router.push({ name: 'support/dashboard' })
    if (role === 'client') router.push({ name: `client/member-details`, params: { id: userId } })
  }
  return { routRedirect }
}

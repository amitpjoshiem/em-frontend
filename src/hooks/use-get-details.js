import { useRouter, useRoute } from 'vue-router'

export function useGetDetails() {
  const router = useRouter()
  const route = useRoute()

  const getDetails = ({ member }) => {
    if (member.type === 'client') {
      router.push({ name: `${route.meta.type}/member-details`, params: { id: member.id } })
      return
    }

    if (member.step === 'default') {
      router.push({ name: 'basic-information', params: { id: member.id } })
      return
    }

    if (member.step !== 'default') {
      router.push({ name: `${route.meta.type}/member-details`, params: { id: member.id } })
      return
    }
  }
  return { getDetails }
}

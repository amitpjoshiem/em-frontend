<template>
  <SwdWrapper>
    <SwdSubHeader title="Warning" />
    <div class="flex flex-col justify-center mt-5 items-center">
      <InlineSvg :src="IconError" />
      <span class="text-gray03 pt-5">
        {{ message }}
      </span>
    </div>
  </SwdWrapper>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import IconError from '@/assets/svg/error_icon.svg'

export default {
  name: 'ErrorPage',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const message = route.query.message
    const type = route.query.type
    router.replace({ name: 'error' })

    const back = () => {
      if (type === 'salesforce') {
        router.replace({ name: 'partners' })
      } else {
        router.replace({ name: 'advisor-dashboard' })
      }
    }

    return {
      message,
      type,
      back,
      IconError,
    }
  },
}
</script>

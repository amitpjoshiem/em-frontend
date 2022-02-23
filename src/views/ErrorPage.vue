<template>
  <div class="p-5">
    <div class="flex pb-5">
      <div class="w-3/12">
        <BackButton text="Back" @click="back" />
      </div>
      <div class="w-6/12 text-center">
        <span class="text-title text-main font-semibold">Warning</span>
      </div>
    </div>
    <div class="flex flex-col justify-center mt-5 items-center">
      <InlineSvg :src="IconError" />
      <span class="text-gray03 pt-5">
        {{ message }}
      </span>
    </div>
  </div>
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
        router.replace({ name: 'dashboard' })
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

<template>
  <div class="flex justify-between pb-5">
    <BackButton text="Dashboard" @click="back" />
    <span class="text-title text-main font-semibold">List of Households</span>
    <ShareBtn />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'ListHeader',
  setup() {
    const router = useRouter()

    const back = () => {
      router.push({ name: 'dashboard' })
    }

    return {
      back,
    }
  },
}
</script>

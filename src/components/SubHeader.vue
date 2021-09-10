<template>
  <div class="flex pb-5">
    <div class="w-3/12">
      <BackButton text="Back" @click="$router.go(-1)" />
    </div>
    <div class="w-6/12 text-center">
      <span class="text-title text-main font-semibold">{{ title }}</span>
    </div>
    <div class="w-3/12 flex justify-end"></div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'SubHeader',
  props: {
    title: {
      type: String,
      require: true,
      default: 'header',
    },
    backPage: {
      type: String,
      require: true,
      default: 'dashboard',
    },
  },
  setup(props) {
    const router = useRouter()

    const back = () => {
      router.push({ name: props.backPage })
    }

    return {
      back,
    }
  },
}
</script>

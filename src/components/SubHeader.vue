<template>
  <div class="flex justify-between pb-5">
    <BackButton text="Dashboard" @click="back" />
    <span class="text-title text-main font-semibold">{{ title }}</span>
    <ShareBtn />
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

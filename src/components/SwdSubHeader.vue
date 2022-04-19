<template>
  <div class="flex pb-5">
    <div class="w-3/12">
      <BackButton text="Back" @click="$router.go(-1)" />
    </div>
    <div class="w-6/12 text-center">
      <span class="text-sm sm:text-title text-main font-semibold">{{ title }}</span>
    </div>
    <div class="w-3/12 text-right">
      <ShareBtn v-if="withShareBtn" :pdf-region="region" />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'SwdSubHeader',
  props: {
    title: {
      type: String,
      require: true,
      default: 'header',
    },
    withShareBtn: {
      type: Boolean,
      require: false,
      default: false,
    },
    region: {
      type: String,
      require: false,
      default: '',
    },
    smallTitle: {
      type: Boolean,
      require: false,
      default: false,
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

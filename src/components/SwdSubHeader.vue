<template>
  <div class="flex pb-5">
    <div class="w-2/12">
      <BackButton v-if="withBackBtn" text="Back" @click="$router.go(-1)" />
    </div>
    <div class="text-center w-8/12">
      <span class="text-sm sm:text-title text-main font-semibold">{{ title }}</span>
    </div>
    <div class="w-2/12 text-right">
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
    withBackBtn: {
      type: Boolean,
      require: false,
      default: true,
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

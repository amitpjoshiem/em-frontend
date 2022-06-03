<template>
  <div class="flex pb-5">
    <div class="w-2/12">
      <BackButton v-if="withBackBtn" text="Back" @click="$router.go(-1)" />
    </div>
    <div class="text-center w-8/12">
      <span class="text-sm sm:text-title text-main font-semibold">{{ title }}</span>
    </div>
    <div class="w-2/12 flex justify-end">
      <ShareBtn v-if="withShareBtn" :pdf-region="region" />
      <SwdInfoBtn v-if="witchInfoBtn" :destination="infoBtnDestination" />
      <slot name="change-assistent" />
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
    witchInfoBtn: {
      type: Boolean,
      require: false,
      default: false,
    },
    infoBtnDestination: {
      type: String,
      require: false,
      default: '',
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

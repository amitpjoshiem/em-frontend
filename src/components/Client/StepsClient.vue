<template>
  <div class="bg-widget-bg rounded-lg px-5 mb-5 lg:max-w-5xl lg:mx-auto">
    <div class="flex w-full pt-2">
      <router-link
        :to="{ name: 'basic-information', params: { id: memberId } }"
        class="w-4/12 text-center text-xs font-medium text-main"
      >
        Basic
      </router-link>
      <router-link
        :to="{ name: 'assets-information', params: { id: memberId } }"
        class="w-4/12 text-center text-xs ml-4"
        :class="{
          'disabled-link': !memberId,
          'text-title-gray': step < 2,
          'font-medium text-main': step > 1,
        }"
      >
        Assets &amp; Income
      </router-link>
      <router-link
        :to="{ name: 'monthly-expense', params: { id: memberId } }"
        class="w-4/12 text-center text-xs"
        :class="{
          'disabled-link': !memberId,
          'text-title-gray': step < 3,
          'font-medium text-main': step > 2,
        }"
      >
        Expenses
      </router-link>
    </div>
    <div class="flex items-center pb-4">
      <!-- STEP 1 -->
      <div class="cycle-active" />
      <div class="flex-grow h-[3px]" :class="{ 'bg-activity': step >= 1 }" />
      <div :class="{ 'cycle-next': step === 1, 'cycle-active': step > 1 }" />
      <div class="flex-grow h-[3px]" :class="{ 'bg-input-border': step < 2, 'bg-activity': step >= 2 }" />

      <!-- STEP 2 -->
      <div :class="{ 'cycle-default': step < 2, 'cycle-active': step > 2, 'cycle-next': step === 2 }" />
      <div class="flex-grow h-[3px]" :class="{ 'bg-input-border': step < 3, 'bg-activity': step >= 3 }" />
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'StepsClient',
  setup() {
    const store = useStore()
    const route = useRoute()
    const step = computed(() => store.state.newClient.step)

    const memberId = computed(() => {
      if (route.params.id) return route.params.id
      return ''
    })

    return {
      step,
      memberId,
    }
  },
}
</script>

<style>
.cycle-active {
  width: 9px;
  height: 9px;
  background-color: #66b6ff;
  border-radius: 50%;
}
.cycle-next {
  width: 13px;
  height: 13px;
  background-color: #66b6ff;
  border-radius: 50%;
  border: 2px solid white;
}

.cycle-default {
  width: 9px;
  height: 9px;
  background: white;
  border: 2px solid #d4ddeb;
  border-radius: 50%;
}

.disabled-link {
  pointer-events: none;
}
</style>

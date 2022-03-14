<template>
  <div class="bg-widget-bg rounded-lg px-5 mb-5">
    <div class="flex w-full pt-7">
      <router-link
        :to="{ name: 'basic-information', params: { id: memberId } }"
        class="w-1/5 text-center text-xs font-medium text-main"
      >
        1. Basic
      </router-link>
      <router-link
        :to="{ name: 'assets-information', params: { id: memberId } }"
        class="w-1/5 text-center text-xs"
        :class="{
          'disabled-link': !memberId,
          'text-title-gray': step < 2,
          'font-medium text-main': step > 1,
        }"
      >
        2. Assets &amp; Income
      </router-link>
      <router-link
        :to="{ name: 'monthly-expense', params: { id: memberId } }"
        class="w-1/5 text-center text-xs"
        :class="{
          'disabled-link': !memberId,
          'text-title-gray': step < 3,
          'font-medium text-main': step > 2,
        }"
      >
        3. Expenses
      </router-link>
      <router-link
        :to="{ name: 'assets-account', params: { id: memberId } }"
        class="w-1/5 text-center text-xs"
        :class="{
          'disabled-link': !memberId,
          'text-title-gray': step < 4,
          'font-medium text-main': step > 3,
        }"
      >
        4. Assets Accounts
      </router-link>
      <router-link
        :to="{ name: 'add-assets-consolidations', params: { id: memberId } }"
        class="w-1/5 text-center text-xs"
        :class="{
          'disabled-link': !memberId,
          'text-title-gray': step < 5,
          'font-medium text-main': step > 4,
        }"
      >
        5. Assets Consolidations
      </router-link>
      <router-link
        :to="{ name: 'stresstest', params: { id: memberId } }"
        class="w-1/5 text-center text-xs"
        :class="{
          'disabled-link': !memberId,
          'text-title-gray': step < 6,
          'font-medium text-main': step > 5,
        }"
      >
        6. Stress Test
      </router-link>
    </div>
    <div class="flex items-center pb-7">
      <!-- STEP 1 -->
      <div class="cycle-active" />
      <div class="flex-grow h-[3px]" :class="{ 'bg-activity': step >= 1 }" />
      <div :class="{ 'cycle-next': step === 1, 'cycle-active': step > 1 }" />
      <div class="flex-grow h-[3px]" :class="{ 'bg-input-border': step < 2, 'bg-activity': step >= 2 }" />

      <!-- STEP 2 -->
      <div :class="{ 'cycle-default': step < 2, 'cycle-active': step > 2, 'cycle-next': step === 2 }" />
      <div class="flex-grow h-[3px]" :class="{ 'bg-input-border': step < 3, 'bg-activity': step >= 3 }" />

      <!-- STEP 3 -->
      <div :class="{ 'cycle-default': step < 3, 'cycle-active': step > 3, 'cycle-next': step === 3 }" />
      <div class="flex-grow h-[3px]" :class="{ 'bg-input-border': step < 4, 'bg-activity': step >= 4 }" />

      <!-- STEP 4 -->
      <div :class="{ 'cycle-default': step < 4, 'cycle-active': step > 4, 'cycle-next': step === 4 }" />
      <div class="flex-grow h-[3px]" :class="{ 'bg-input-border': step < 5, 'bg-activity': step >= 5 }" />

      <!-- STEP 5 -->
      <div :class="{ 'cycle-default': step < 5, 'cycle-active': step > 5, 'cycle-next': step === 5 }" />
      <div class="flex-grow h-[3px]" :class="{ 'bg-input-border': step < 6, 'bg-activity': step >= 6 }" />

      <!-- STEP 6 -->
      <div :class="{ 'cycle-default': step < 6, 'cycle-active': step > 6, 'cycle-next': step === 6 }" />
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'NewProspectSteps',
  setup() {
    const store = useStore()
    const route = useRoute()
    const step = computed(() => store.state.newProspect.step)

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

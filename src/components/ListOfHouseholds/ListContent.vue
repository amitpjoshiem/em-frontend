<template>
  <div class="border border-color-grey rounded-t-lg">
    <div class="flex p-5 justify-between">
      <div class="flex">
        <router-link
          :to="{ name: 'all' }"
          class="mr-5 text-gray03 text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'all' }"
        >
          All Households
        </router-link>
        <router-link
          :to="{ name: 'prospects' }"
          class="mr-5 text-gray03 text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'prospects' }"
        >
          Opportunities
        </router-link>
        <router-link
          :to="{ name: 'clients' }"
          class="text-gray03 text-smm cursor-pointer"
          :class="{ active: getActiveTab === 'clients' }"
        >
          Clients
        </router-link>
      </div>
      <div class="flex">
        <SwdItemsPerPage :destination="'listOfHouseholds'" />
        <!-- <SwdDropDown class="ml-2.5" :options="actionsOptions">
          <template #titleDropDown>
            <span
              class="
                cursor-pointer
                bg-white
                rounded
                flex
                justify-center
                items-center
                py-2
                px-3
                border border-color-grey
              "
            >
              <InlineSvg :src="IconAction" />
            </span>
          </template>
        </SwdDropDown> -->
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import IconAction from '@/assets/svg/icon-action.svg'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'ListContent',
  setup() {
    const route = useRoute()

    const getActiveTab = computed(() => {
      return route.name
    })

    // const actionsOptions = [
    //   {
    //     title: 'Item 1',
    //     command: 'item-1',
    //   },
    //   {
    //     title: 'Item 2',
    //     command: 'item2',
    //   },
    // ]

    return {
      getActiveTab,
      // actionsOptions,
      IconAction,
    }
  },
}
</script>

<style scoped>
.active {
  color: #66b6ff;
  border-bottom: 2px solid #66b6ff;
}
</style>

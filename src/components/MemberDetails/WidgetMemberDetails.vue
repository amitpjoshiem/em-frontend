<template>
  <div class="w-8/24 pr-5">
    <div class="bg-widget-bg rounded-lg p-5">
      <div class="border-b pb-5">
        <div class="flex">
          <Avatar />
          <div class="flex flex-col ml-2">
            <router-link
              :to="{
                name: 'member-basic-information',
                params: { id: memberId },
              }"
              class="text-sm text-main font-medium"
            >
              {{ user.name }}
            </router-link>
            <span class="text-small text-activity-item font-medium uppercase">
              {{ user.type }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex justify-between py-3">
        <div class="flex items-center">
          <span
            class="
              w-6
              h-6
              rounded-md
              flex
              justify-center
              items-center
              bg-color-error
            "
          >
            <InlineSvg :src="IconProspectAge" />
          </span>
          <span class="ml-2 text-xs text-gray03">Age</span>
        </div>
        <div class="text-sm">
          <span class="text-gray03 pr-px">{{ user.name.charAt(0) }}</span>
          <span class="text-main pr-2">{{ user.age }}</span>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="flex items-center">
          <span
            class="
              w-6
              h-6
              rounded-md
              flex
              justify-center
              items-center
              bg-color-error
            "
          >
            <InlineSvg :src="IconTotal" />
          </span>
          <span class="ml-2 text-xs text-gray03">Total net worth:</span>
        </div>
        <div class="text-sm">
          <span class="text-main font-semibold">$900,000</span>
        </div>
      </div>

      <div class="flex justify-between pt-3">
        <div class="flex items-center">
          <span
            class="
              w-6
              h-6
              rounded-md
              flex
              justify-center
              items-center
              bg-color-error
            "
          >
            <InlineSvg :src="IconGoal" />
          </span>
          <span class="ml-2 text-xs text-gray03">Goal:</span>
        </div>
        <div class="text-sm">
          <span class="text-main font-semibold">$1,200,000</span>
        </div>
      </div>

      <div v-if="user.type === 'prospect'" class="flex justify-between pt-5">
        <Button
          small-btn-activity
          text-semi-bold
          text-btn="Convert to client"
          @click="convert"
        />

        <router-link
          :to="{ name: 'bluereport', params: { id: user.id } }"
          class="pl-2.5 font-medium"
        >
          <Button small-btn-gray text-semi-bold text-btn="Blueprint report" />
        </router-link>
      </div>
      <div v-else class="flex justify-end pt-5">
        <router-link
          :to="{ name: 'clientreport', params: { id: user.id } }"
          class="pl-2.5 font-medium"
        >
          <Button small-btn-gray text-semi-bold text-btn="Client report" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import IconProspectAge from '@/assets/svg/prospect-age.svg'
import IconTotal from '@/assets/svg/icon-total.svg'
import IconGoal from '@/assets/svg/icon-goal.svg'
import { useRoute } from 'vue-router'
import { convertToClient } from '@/api/vueQuery/convert-to-client'
import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'WidgetMemberDetails',
  props: {
    user: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  emits: ['updateMemberInfo'],
  setup(_, { emit }) {
    const route = useRoute()
    const memberId = route.params.id

    const {
      isLoading,
      isFetching,
      data,
      error,
      mutateAsync: convertClient,
    } = useMutation(convertToClient)

    const convert = async () => {
      const res = await convertToClient(memberId)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Convert successfully',
        })
        emit('updateMemberInfo')
      } else {
        useAlert({
          title: 'Error',
          type: 'error',
          message: res.error.message,
        })
      }
    }

    return {
      IconProspectAge,
      IconTotal,
      IconGoal,
      convert,
      memberId,
      convertClient,
      isLoading,
      isFetching,
      data,
      error,
    }
  },
}
</script>

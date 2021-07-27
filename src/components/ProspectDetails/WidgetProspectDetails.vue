<template>
  <div class="w-8/24 pr-5">
    <div class="bg-widget-bg rounded-lg p-5">
      <div class="border-b pb-5">
        <div class="flex">
          <Avatar />
          <div class="flex flex-col ml-2">
            <span class="text-sm text-main font-medium">
              {{ user.firstName }} {{ user.lastName }}
            </span>
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
          <span class="text-gray03 pr-px">{{ user.firstName.charAt(0) }}</span>
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

      <div class="flex justify-between pt-5">
        <Button
          small-btn-activity
          text-semi-bold
          text-btn="Convert to client"
          @click="convertToClient"
        />
        <Button
          small-btn-gray
          text-semi-bold
          text-btn="Blueprint report"
          @click="blueprintReport"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IconProspectAge from '@/assets/svg/prospect-age.svg'
import IconTotal from '@/assets/svg/icon-total.svg'
import IconGoal from '@/assets/svg/icon-goal.svg'
export default {
  name: 'WidgetProspectDetails',
  props: {
    user: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup() {
    const convertToClient = () => {
      console.log('convertToClient')
    }

    const blueprintReport = () => {
      console.log('blueprintReport')
    }
    return {
      IconProspectAge,
      IconTotal,
      IconGoal,
      convertToClient,
      blueprintReport,
    }
  },
}
</script>

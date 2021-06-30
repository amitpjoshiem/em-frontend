<template>
  <div class="p-5">
    <div class="flex justify-between py-5">
      <BackButton @click="back" />
      <span>Blueprint report</span>
      <ShareBtn />
    </div>
    <div class="flex">
      <div class="w-7/12">
        <div class="flex">
          <div class="w-7/12 bg-widget-bg rounded-lg">
            <div class="border-b">
              <div class="flex p-5">
                <Avatar />
                <div class="flex flex-col ml-2">
                  <span class="text-sm text-main font-semibold"
                    >John & Sarah Travis</span
                  >
                  <span
                    class="
                      text-small text-activity-item
                      font-semibold
                      uppercase
                    "
                    >Prospect</span
                  >
                </div>
              </div>
            </div>
            <div class="flex p-5 items-center">
              <InlineSvg :src="IconRedRisk" />
              <span class="ml-2 text-xs text-gray03">Red risk</span>
            </div>
            <div class="flex pl-5 items-center">
              <InlineSvg :src="IconOpenSafety" />
              <span class="ml-2 text-xs text-gray03">Open-safety</span>
            </div>
            <div class="flex p-5 items-center">
              <InlineSvg :src="IconBlueCash" />
              <span class="ml-2 text-xs text-gray03">Blue-cash liquidity</span>
            </div>
          </div>
          <div class="w-5/12">total</div>
        </div>
        <div class="border border-color-grey rounded-lg mr-5 mt-5 p-5">
          <span>Concerns</span>
          <div class="flex justify-between pt-5">
            <div>
              <div class="flex text-xs text-main">
                <InlineSvg :src="IconCheckGreen" />
                <span class="ml-1.5"> High Fees</span>
              </div>
              <div class="flex pt-2 text-xs text-main">
                <InlineSvg :src="IconCheckGreen" />
                <span class="ml-1.5"> Extremely high market exposure</span>
              </div>
              <div class="flex pt-2 text-xs text-main">
                <InlineSvg :src="IconCheckGreen" />
                <span class="ml-1.5"> Simple</span>
              </div>
            </div>
            <div>
              <div class="flex text-xs text-main">
                <InlineSvg :src="IconCheckGreen" />
                <span class="ml-1.5"> Keep the money safe</span>
              </div>
              <div class="flex pt-2 text-xs text-main">
                <InlineSvg :src="IconCheckGreen" />
                <span class="ml-1.5"> Massive Overlap</span>
              </div>
              <div class="flex pt-2 text-xs text-main">
                <InlineSvg :src="IconCheckGreen" />
                <span class="ml-1.5">
                  Design, implement and monitoring income strategy</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-5/12">
        <div
          class="
            bg-widget-bg
            pt-5
            pl-5
            pb-2
            rounded-tr-lg rounded-tl-lg
            text-smm text-main
            font-semibold
          "
        >
          Monthly Income analysis
        </div>
        <div class="flex py-2 border-b border-r border-l border-color-grey">
          <div class="w-6/12" />
          <div class="w-3/12 text-xs text-gray03">Current</div>
          <div class="w-3/12 text-xs text-gray03 text-right pr-7">Future</div>
        </div>

        <div
          v-for="(item, index) in monthlyIncome"
          :key="index"
          class="
            flex
            text-xss text-main
            border-b border-r border-l border-color-grey
            py-2
          "
        >
          <div class="w-6/12 pl-5">{{ item.title }}</div>
          <div class="w-3/12">{{ item.current }}</div>
          <div class="w-3/12 text-right pr-5">{{ item.future }}</div>
        </div>

        <div
          class="
            bg-widget-bg
            pt-5
            pl-5
            pb-2
            text-xss text-main
            font-semibold
            flex
            justify-between
          "
        >
          <div class="w-6/12">Monthly Expenses</div>
          <div class="w-3/12 text-right pr-5">$2000</div>
        </div>

        <div
          v-for="(item, index) in monthlyExpenses"
          :key="index"
          class="
            flex
            justify-between
            text-xss text-main
            border-b border-r border-l border-color-grey
            py-2
          "
        >
          <div class="w-6/12 pl-5">{{ item.title }}</div>
          <div class="w-3/12 pr-5 text-right">{{ item.future }}</div>
        </div>

        <div
          class="
            bg-color-light-blue
            rounded-br-lg rounded-bl-lg
            text-xss text-main
            font-semibold
          "
        >
          <div class="pl-5 pr-5 py-3 flex justify-between">
            <span>Total:</span>
            <span>$1.500</span>
          </div>
          <div class="pl-5 pr-5 pb-3 flex justify-between">
            <span>Shortfall:</span>
            <span>$1.500</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconRedRisk from '@/assets/svg/icon-red-risk.svg'
import IconOpenSafety from '@/assets/svg/icon-open-safety.svg'
import IconBlueCash from '@/assets/svg/icon-blue-cash.svg'
import IconCheckGreen from '@/assets/svg/icon-check-green.svg'

import {
  useMonthlyIncome,
  useMonthlyExpenses,
} from '@/components/NewProspect/DTO/blueReport'

export default {
  name: 'NewPeospectBlueReport',
  setup() {
    const { data: monthlyIncome } = useMonthlyIncome()
    const { data: monthlyExpenses } = useMonthlyExpenses()

    return {
      IconRedRisk,
      IconOpenSafety,
      IconBlueCash,
      monthlyIncome,
      monthlyExpenses,
      IconCheckGreen,
    }
  },
}
</script>

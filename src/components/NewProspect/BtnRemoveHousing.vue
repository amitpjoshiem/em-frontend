<template>
  <div class="w-2/12 mt-[21px] text-right">
    <el-button type="danger" plain :disabled="isDisabledBtn" @click="handleRemove"> Remove house </el-button>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'BtnRemoveHousing',
  props: {
    index: {
      type: Number,
      require: true,
      default: 0,
    },
    house: {
      type: Object,
      require: true,
      default: () => {},
    },
    amountHouses: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  emits: ['handleRemoveHouse'],

  setup(props, { emit }) {
    const handleRemove = () => {
      emit('handleRemoveHouse', props.index)
    }

    const isDisabledBtn = computed(() => {
      if (props.amountHouses > 1) return false

      if (
        props.amountHouses === 1 &&
        props.house.type === 'own' &&
        (props.house.market_value || props.house.monthly_payment || props.house.remaining_mortgage_amount)
      ) {
        return false
      }

      if (
        props.amountHouses === 1 &&
        props.house.type === 'family' &&
        (props.house.market_value || props.house.monthly_payment || props.house.remaining_mortgage_amount)
      ) {
        return false
      }

      if (
        props.amountHouses === 1 &&
        props.house.type === 'rent' &&
        (props.house.monthly_payment || props.house.total_monthly_expenses)
      ) {
        return false
      }
      return true
    })

    return {
      handleRemove,
      isDisabledBtn,
    }
  },
}
</script>

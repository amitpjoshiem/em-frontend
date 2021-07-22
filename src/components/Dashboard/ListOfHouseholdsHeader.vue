<template>
  <div class="p-5 flex justify-between">
    <span>List of Households</span>
    <div class="flex items-center">
      <ItemsPerPage />
      <!-- <Select :options="options" large /> -->

      <MySelect :options="actionsOptions" @select="handleSelect" />

      <DropDown class="ml-2" :options="actionsOptions">
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
      </DropDown>
    </div>
  </div>
</template>
<script>
import IconAction from '@/assets/svg/icon-action.svg'

export default {
  name: 'ListOfHouseholdsHeader',
  emits: ['changeHouseholderType'],
  setup(props, { emit }) {
    const actionsOptions = [
      {
        title: 'All',
        command: 'all',
      },
      {
        title: 'Clients',
        command: 'clients',
      },
      {
        title: 'Prospect',
        command: 'prospect',
      },
    ]

    const options = [
      {
        value: 'Option1',
        label: 'All',
      },
      {
        value: 'Option2',
        label: 'Prospect',
      },
      {
        value: 'Option3',
        label: 'Clients',
      },
    ]

    const actionsMap = {
      All: () => console.log('all'),
      Clients: () => emit('changeHouseholderType', 'client'),
      Prospect: () => console.log('prospect'),
    }

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    return {
      actionsOptions,
      IconAction,
      options,
      handleSelect,
    }
  },
}
</script>

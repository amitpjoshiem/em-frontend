<template>
  <div class="flex justify-between items-center">
    <span class="text-smm font-medium">Assets</span>
    <SwdNativeSelect :options="options" init-value="Past month" size="large" />
  </div>
</template>

<script>
export default {
  name: 'AssetsHeader',
  data() {
    return {
      options: [
        {
          title: 'Past year',
          command: 'year',
        },
        {
          title: 'Past month',
          command: 'month',
        },
        {
          title: 'Past quarter',
          command: 'quarter',
        },
      ],
      value: '',
    }
  },
}
</script>

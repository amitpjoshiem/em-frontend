<template>
  <el-select
    v-model="data.value"
    filterable
    remote
    reserve-keyword
    placeholder="Search"
    :remote-method="remoteMethod"
    :loading="data.loading"
  >
    <el-option
      v-for="item in data.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      suffix-icon="el-icon-date"
    />
  </el-select>
</template>

<script>
import { onMounted, reactive } from 'vue'

export default {
  name: 'RemoteSearch',
  setup() {
    const data = reactive({
      options: [],
      value: [],
      list: [],
      loading: false,
      states: [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
      ],
    })

    onMounted(() => {
      data.list = data.states.map((item) => {
        return { value: item }
      })
    })

    const remoteMethod = (query) => {
      if (query !== '') {
        data.loading = true
        setTimeout(() => {
          data.loading = false
          data.options = data.list
        }, 200)
      } else {
        data.options = []
      }
    }

    return {
      data,
      remoteMethod,
    }
  },
}
</script>

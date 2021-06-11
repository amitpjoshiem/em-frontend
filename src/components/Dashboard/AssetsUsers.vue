<template>
  <div>
    <AssetsUsersItem
      v-for="(user, index) in usersList"
      :key="index"
      :user="user"
    />
  </div>
</template>
<script>
import AssetsUsersItem from '@/components/Dashboard/AssetsUsersItem.vue'
export default {
  name: 'AssetsUsers',
  components: {
    AssetsUsersItem,
  },
  data() {
    return {
      usersList: [
        {
          avatar: '',
          name: 'Jerome & Mary Nelson',
          type: 'prospect',
          profit: '999,999.99',
          progress: 80,
          balance: '963,21',
        },
        {
          avatar: '',
          name: 'Cody & Barbara Moore',
          type: 'prospect',
          profit: '12,380',
          progress: 59,
          balance: '746,44',
        },
        {
          avatar: '',
          name: 'Kelli & Joseph Higgins',
          type: 'prospect',
          profit: '8,654',
          progress: 27,
          balance: '458,44',
        },
        {
          avatar: '',
          name: 'Lydia & Daniel Carpenter',
          type: 'prospect',
          profit: '2,654',
          progress: 27,
          balance: '370,44',
        },
      ],
    }
  },
}
</script>

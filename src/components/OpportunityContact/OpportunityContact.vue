<template>
  <div class="p-5">
    <SwdSubHeader title="Opportunity contact" />
    <div>Opportunity Contact List</div>
    <div v-if="!isLoading">
      <el-card v-for="item in contacts.data" :key="item.id" class="box-card mb-5">
        <div class="flex">
          <div class="w-2/12 flex items-center justify-center">
            <SwdAvatar size="large" />
          </div>
          <div class="flex flex-col w-5/12">
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">name:</span>
              <span class="text-sm text-main">{{ item.name }}</span>
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">email:</span>
              <span class="text-sm text-main">{{ item.email }}</span>
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">birthday:</span>
              <span class="text-sm text-main">{{ item.birthday }}</span>
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">age:</span>
              <span class="text-sm text-main">{{ item.age }}</span>
            </div>
            <div>
              <span
                v-if="!item.retired"
                data-testid="type-member-basic-information-spouse-not-retired"
                class="text-border-green text-xxs font-semibold bg-light-green rounded pr-2 pl-1 py-1"
              >
                Not Retired
              </span>
              <span
                v-if="item.retired"
                data-testid="type-member-basic-information-spouse-retired"
                class="text-xxs text-orange-badge font-semibold bg-orange-bg rounded pr-2 pl-1 py-1"
              >
                Retired
              </span>
            </div>
          </div>
          <div class="flex flex-col w-5/12">
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">retirement date:</span>
              <span class="text-sm text-main">{{ item.retirement_date }}</span>
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">phone:</span>
              <span class="text-sm text-main">{{ item.phone }}</span>
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">created_at:</span>
              <span class="text-sm text-main">{{ item.created_at }}</span>
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">updated_at:</span>
              <span class="text-sm text-main">{{ item.updated_at }}</span>
            </div>
            <div>
              <el-checkbox v-model="item.is_spouse" label="Spouse" size="small" />
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { useFetchAllContacts } from '@/api/use-fetch-all-contacts.js'
import { useRoute } from 'vue-router'

export default {
  name: 'OpportunityContact',
  setup() {
    const route = useRoute()

    const memberId = route.params.id

    const { isLoading, isError, isFetching, data: contacts, isFetched, refetch } = useFetchAllContacts(memberId)

    return {
      isLoading,
      isError,
      isFetching,
      contacts,
      isFetched,
      refetch,
    }
  },
}
</script>

<template>
  <div class="p-5">
    <SwdSubHeader title="Opportunity contacts" />
    <div class="flex justify-end py-5">
      <el-button type="primary" @click="addContact">Add contact</el-button>
    </div>
    <div v-if="!isLoading">
      <el-card v-for="item in contacts" :key="item.id" class="box-card mb-5">
        <div class="flex">
          <div class="w-2/12 flex items-center justify-center">
            <SwdAvatar size="large" />
          </div>
          <div class="flex flex-col w-5/12">
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">Name:</span>
              <SwdStubForText :text="item.name" plug="&mdash;" class="text-sm text-main inline-block" />
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">Email:</span>
              <span class="text-sm text-main">{{ item.email }}</span>
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">Birthday:</span>
              <SwdStubForText :text="item.birthdayFormatted" plug="&mdash;" class="text-sm text-main inline-block" />
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">Age:</span>
              <SwdStubForText :text="item.age" plug="&mdash;" class="text-sm text-main inline-block" />
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
          <div class="flex flex-col w-4/12">
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">Retirement date:</span>
              <SwdStubForText :text="item.retirementFormatted" plug="&mdash;" class="text-sm text-main inline-block" />
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">Phone:</span>
              <SwdStubForText :text="item.phone" plug="&mdash;" class="text-sm text-main inline-block" />
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">Created:</span>
              <SwdStubForText :text="item.createdFormatted" plug="&mdash;" class="text-sm text-main inline-block" />
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">Updated</span>
              <SwdStubForText :text="item.updatedFormatted" plug="&mdash;" class="text-sm text-main inline-block" />
            </div>
            <div>
              <el-checkbox v-model="item.is_spouse" label="Spouse" size="small" />
            </div>
          </div>
          <div class="w-1/12 flex flex-col items-center justify-center">
            <el-button type="primary" :icon="Edit" circle @click="editContact" />
            <el-button type="danger" :icon="Delete" circle @click="removeContact" />
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { useFetchAllContacts } from '@/api/use-fetch-all-contacts.js'
import { useRoute } from 'vue-router'
import { Edit, Delete } from '@element-plus/icons-vue'

export default {
  name: 'OpportunityContact',

  setup() {
    const route = useRoute()

    const memberId = route.params.id

    const { isLoading, isError, isFetching, data: contacts, isFetched, refetch } = useFetchAllContacts(memberId)

    const addContact = () => {
      console.log('addContact')
    }

    const editContact = () => {
      console.log('editContact')
    }

    const removeContact = () => {
      console.log('removeContact')
    }

    return {
      isLoading,
      isError,
      isFetching,
      contacts,
      isFetched,
      refetch,

      addContact,
      editContact,
      removeContact,

      Edit,
      Delete,
    }
  },
}
</script>

<style scoped>
.el-button + .el-button {
  margin-top: 25px;
  margin-left: 0;
}
</style>

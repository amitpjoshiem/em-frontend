<template>
  <div class="p-5">
    <SwdSubHeader title="Opportunity contacts" />
    <div class="flex justify-end pb-5">
      <el-button type="primary" @click="addContact">Add contact</el-button>
    </div>
    <div v-if="!isLoading">
      <el-card v-for="item in state" :key="item.id" class="box-card mb-5">
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
              <SwdStubForText :text="item.birthday" plug="&mdash;" class="text-sm text-main inline-block" />
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
              <SwdStubForText :text="item.retirement_date" plug="&mdash;" class="text-sm text-main inline-block" />
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">Phone:</span>
              <SwdStubForText :text="item.phone" plug="&mdash;" class="text-sm text-main inline-block" />
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">Created:</span>
              <SwdStubForText :text="item.created_at" plug="&mdash;" class="text-sm text-main inline-block" />
            </div>
            <div class="mb-1">
              <span class="text-xss text-gray03 font-semibold pr-2">Updated</span>
              <SwdStubForText :text="item.updated_at" plug="&mdash;" class="text-sm text-main inline-block" />
            </div>
            <div>
              <el-checkbox
                v-model="item.is_spouse"
                label="Spouse"
                size="small"
                :disabled="loadingUpdateContact || isFetching"
                @change="changeSpouse(item.id)"
              />
            </div>
          </div>
          <div class="w-1/12 flex flex-col items-center justify-center">
            <el-button type="primary" :icon="Edit" circle @click="editContact(item.id)" />
            <el-popconfirm
              confirm-button-text="OK"
              cancel-button-text="No, Thanks"
              :icon="InfoFilled"
              icon-color="red"
              title="Are you sure to delete this?"
              @confirm="removeContact(item.id)"
            >
              <template #reference>
                <el-button type="danger" :icon="Delete" circle />
              </template>
            </el-popconfirm>
          </div>
        </div>
      </el-card>
    </div>
    <el-skeleton v-else :rows="10" animated />
  </div>
  <ModalContact />
</template>

<script>
import { reactive, watchEffect } from 'vue'
import { useFetchAllContacts } from '@/api/use-fetch-all-contacts.js'
import { useRoute } from 'vue-router'
import { Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
import { updateContacts } from '@/api/vueQuery/update-contacts'
import { deleteContacts } from '@/api/vueQuery/delete-contacts'
import { useMutation, useQueryClient } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { useStore } from 'vuex'
import ModalContact from '@/components/OpportunityContact/ModalContact.vue'

export default {
  name: 'OpportunityContact',
  components: {
    ModalContact,
  },

  setup() {
    const route = useRoute()
    const store = useStore()
    const queryClient = useQueryClient()
    const memberId = route.params.id

    const { isLoading, isError, isFetching, data: contacts, isFetched, refetch } = useFetchAllContacts(memberId)
    const { mutateAsync: updateContact, isLoading: loadingUpdateContact } = useMutation(updateContacts)
    const { mutateAsync: deleteContact, isLoading: loadingDeleteContact } = useMutation(deleteContacts)

    const state = reactive([])

    watchEffect(() => {
      if (!isLoading.value) {
        Object.assign(state, JSON.parse(JSON.stringify(contacts.value)))
      }
    })

    const addContact = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'modalContact',
        value: true,
      })
    }

    const editContact = (id) => {
      store.commit('globalComponents/setShowModal', {
        destination: 'modalContact',
        value: true,
      })

      const contact = state.find((item) => item.id === id)

      store.commit('globalComponents/setContact', contact)
    }

    const removeContact = async (id) => {
      const res = await deleteContact(id)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Delete successfully',
        })
        queryClient.invalidateQueries(['contactsAll', memberId])
      }
    }

    const changeSpouse = async (id) => {
      const form = {
        is_spouse: true,
      }
      const res = await updateContact({ form, id })
      responseUpdate(res)
    }

    const responseUpdate = (res) => {
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Update successfully',
        })
        queryClient.invalidateQueries(['contactsAll', memberId])
      }
    }

    return {
      state,

      isLoading,
      isError,
      isFetching,
      contacts,
      isFetched,
      refetch,
      loadingUpdateContact,

      addContact,
      editContact,
      removeContact,
      changeSpouse,

      deleteContact,
      loadingDeleteContact,

      Edit,
      Delete,
      InfoFilled,
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

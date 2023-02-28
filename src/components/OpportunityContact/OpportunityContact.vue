<template>
  <SwdWrapper>
    <SwdSubHeader :title="getTitle" />
    <div class="flex justify-end pb-5">
      <SwdButton v-if="!$can('client', 'all') && !$can('support', 'all')" primary main @click="addContact">
        Add contact
      </SwdButton>
    </div>
    <div v-if="!isLoading">
      <template v-if="contacts.length">
        <el-card v-for="(item, index) in contacts" :key="item.id" class="box-card mb-5">
          <div class="flex">
            <div class="w-2/12 flex items-center justify-center">
              <SwdAvatar size="large" />
            </div>
            <div class="flex flex-col w-5/12">
              <div class="mb-1">
                <span class="text-xss text-main font-semibold pr-2">First name:</span>
                <SwdStubForText :text="item.first_name" plug="&mdash;" class="text-sm text-main inline-block" />
              </div>
              <div class="mb-1">
                <span class="text-xss text-main font-semibold pr-2">Last name:</span>
                <SwdStubForText :text="item.last_name" plug="&mdash;" class="text-sm text-main inline-block" />
              </div>
              <div class="mb-1">
                <span class="text-xss text-main font-semibold pr-2">Email:</span>
                <span class="text-sm text-main">{{ item.email }}</span>
              </div>
              <div class="mb-1">
                <span class="text-xss text-main font-semibold pr-2">Birthday:</span>
                <SwdStubForText :text="item.birthday" plug="&mdash;" class="text-sm text-main inline-block" />
              </div>
              <div class="mb-1">
                <span class="text-xss text-main font-semibold pr-2">Age:</span>
                <SwdStubForText :text="item.age" plug="&mdash;" class="text-sm text-main inline-block" />
              </div>
              <div>
                <span
                  v-if="!item.retired"
                  data-testid="type-member-basic-information-spouse-not-retired"
                  class="text-border-green text-xxs font-semibold bg-main-orange rounded px-2 py-1"
                >
                  Not Retired
                </span>
                <span
                  v-if="item.retired"
                  data-testid="type-member-basic-information-spouse-retired"
                  class="text-xxs text-orange-badge font-semibold bg-main-green rounded px-2 py-1"
                >
                  Retired
                </span>
              </div>
            </div>
            <div class="flex flex-col w-4/12">
              <div class="mb-1">
                <span class="text-xss text-main font-semibold pr-2">Retirement date:</span>
                <SwdStubForText :text="item.retirement_date" plug="&mdash;" class="text-sm text-main inline-block" />
              </div>
              <div class="mb-1">
                <span class="text-xss text-main font-semibold pr-2">Phone:</span>
                <SwdStubForText :text="item.phone" plug="&mdash;" class="text-sm text-main inline-block" />
              </div>
              <div class="mb-1">
                <span class="text-xss text-main font-semibold pr-2">Created:</span>
                <SwdStubForText :text="item.created_at" plug="&mdash;" class="text-sm text-main inline-block" />
              </div>
              <div class="mb-1">
                <span class="text-xss text-main font-semibold pr-2">Updated</span>
                <SwdStubForText :text="item.updated_at" plug="&mdash;" class="text-sm text-main inline-block" />
              </div>
              <div>
                <el-checkbox
                  v-model="item.is_spouse"
                  label="Spouse/Partner"
                  size="small"
                  :disabled="isDisabledSpouse"
                  @change="changeSpouse(item.id, index)"
                />
              </div>
            </div>
            <div
              v-if="!$can('client', 'all') && !$can('support', 'all')"
              class="w-1/12 flex flex-col items-center justify-center"
            >
              <el-button type="primary" plain :icon="Edit" circle @click="editContact(item.id)" />
              <el-popconfirm
                confirm-button-text="OK"
                cancel-button-text="No, Thanks"
                :icon="InfoFilled"
                icon-color="red"
                title="Are you sure to delete this?"
                @confirm="removeContact(item.id)"
              >
                <template #reference>
                  <el-button type="danger" :icon="Delete" circle plain />
                </template>
              </el-popconfirm>
            </div>
          </div>
        </el-card>
      </template>
      <div v-else class="text-main flex items-center flex-col mt-5">
        <div class="bg-main-gray rounded-full w-16 h-16 flex flex-col items-center justify-center mb-3">
          <InlineSvg :src="IconEmptyUsers" />
        </div>
        <p>No recently added contacts</p>
      </div>
    </div>
    <el-skeleton v-else :rows="10" animated />
    <ModalContact />
  </SwdWrapper>
</template>

<script>
import { computed } from 'vue'
import { useFetchAllContacts } from '@/api/use-fetch-all-contacts.js'
import { useRoute } from 'vue-router'
import { Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
import { updateContacts } from '@/api/vueQuery/update-contacts'
import { deleteContacts } from '@/api/vueQuery/delete-contacts'
import { useMutation, useQueryClient } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { useStore } from 'vuex'
import { useAbility } from '@casl/vue'
import ModalContact from '@/components/OpportunityContact/ModalContact.vue'
import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'

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
    const { can } = useAbility()

    const { isLoading, isFetching, data: contacts } = useFetchAllContacts(memberId)
    const { mutateAsync: updateContact, isLoading: loadingUpdateContact } = useMutation(updateContacts)
    const { mutateAsync: deleteContact } = useMutation(deleteContacts)

    const getTitle = computed(() => {
      if (route.meta.type === 'client') return 'Client Contacts'
      return 'Opportunity contacts'
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
      const contact = contacts.value.find((item) => item.id === id)
      store.commit('globalComponents/setContact', contact)
    }

    const removeContact = async (id) => {
      const res = await deleteContact(id)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Delete successfully.',
        })
        queryClient.invalidateQueries(['contacts-all', memberId])
      }
    }

    const changeSpouse = async (id, index) => {
      const form = {
        is_spouse: !contacts.value[index].is_spouse,
      }
      const res = await updateContact({ form, id })
      responseUpdate(res)
    }

    const responseUpdate = (res) => {
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Update successfully.',
        })
        queryClient.invalidateQueries(['contacts-all', memberId])
      }
    }

    const isDisabledSpouse = computed(() => {
      if (can('client', 'all') || can('support', 'all')) return true
      if (loadingUpdateContact.value || isFetching.value) return true
      return false
    })

    return {
      isLoading,
      contacts,
      addContact,
      editContact,
      removeContact,
      changeSpouse,
      deleteContact,
      Edit,
      Delete,
      InfoFilled,
      IconEmptyUsers,
      getTitle,
      isDisabledSpouse,
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

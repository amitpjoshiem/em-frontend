<template>
  <el-dialog
    v-model="state.dialogVisible"
    :title="getTitleModal"
    width="55%"
    custom-class="dialog-style pdf-viewer"
    :before-close="closeDialog"
  >
    <el-form ref="form" :model="contact" status-icon label-position="top" :rules="rules">
      <div class="flex mb-4">
        <el-form-item label="Retired?">
          <el-radio-group v-model="contact.retired">
            <el-radio :label="true">Yes</el-radio>
            <el-radio :label="false">No</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Spouse?" class="ml-10">
          <el-radio-group v-model="contact.is_spouse">
            <el-radio :label="true">Yes</el-radio>
            <el-radio :label="false">No</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <el-form-item label="Name" prop="name" class="w-full mb-4">
        <el-input v-model="contact.name" placeholder="Enter name" />
      </el-form-item>
      <el-form-item label="Birthday" class="w-full mb-4">
        <el-date-picker
          v-model="contact.birthday"
          type="date"
          :placeholder="getPlaceholder"
          format="MM/DD/YYYY"
          value-format="MM/DD/YYYY"
        />
      </el-form-item>
      <el-form-item v-if="contact.retired" label="Retirement date" class="w-full mb-4">
        <el-date-picker
          v-model="contact.retirement_date"
          type="date"
          :placeholder="getPlaceholder"
          format="MM/DD/YYYY"
          value-format="MM/DD/YYYY"
        />
      </el-form-item>
      <el-form-item label="Email" class="w-full mb-4" prop="email">
        <el-input v-model="contact.email" placeholder="Enter email" />
      </el-form-item>
      <el-form-item label="Phone" class="w-full mb-4" prop="phone">
        <el-input v-model="contact.phone" v-maska="'(###) ###-####'" placeholder="Enter phone" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Close</el-button>
        <el-button type="primary" class="ml-4" @click="saveContact">Save</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, watchEffect, computed, ref } from 'vue'
import dayjs from 'dayjs'
import { maska } from 'maska'
import { useAlert } from '@/utils/use-alert'
import { updateContacts } from '@/api/vueQuery/update-contacts'
import { createContacts } from '@/api/vueQuery/create-contacts'
import { useMutation, useQueryClient } from 'vue-query'
import { useRoute } from 'vue-router'
import { rules } from '@/validationRules/contacts.js'

function setInitValue(contact, data) {
  contact.birthday = data.birthday
  contact.email = data.email
  contact.is_spouse = data.is_spouse
  contact.name = data.name
  contact.phone = data.phone
  contact.retired = data.retired !== null ? data.retired : false
  contact.retirement_date = data.retirement_date
}

function resetInitValue(contact) {
  contact.birthday = ''
  contact.email = ''
  contact.is_spouse = false
  contact.name = ''
  contact.phone = ''
  contact.retired = false
  contact.retirement_date = ''
}

export default {
  name: 'ModalContact',
  directives: { maska },

  setup() {
    const store = useStore()
    const route = useRoute()
    const contact = reactive({})
    const form = ref(null)
    const queryClient = useQueryClient()
    const memberId = route.params.id

    const state = reactive({
      dialogVisible: false,
      editModal: false,
      contactId: null,
    })

    const { mutateAsync: updateContact, isLoading: loadingUpdateContact } = useMutation(updateContacts)
    const { mutateAsync: createContact, isLoading: loadingCreateContact } = useMutation(createContacts)

    watchEffect(() => {
      state.dialogVisible = store.state.globalComponents.dialog.showDialog.modalContact
      if (store.state.globalComponents.dialog.showDialog.modalContact && store.state.globalComponents.contact?.id) {
        setInitValue(contact, JSON.parse(JSON.stringify(store.state.globalComponents.contact)))
        state.editModal = true
        state.contactId = store.state.globalComponents.contact.id
      } else {
        resetInitValue(contact)
        state.editModal = false
        state.contactId = null
      }
    })

    const getTitleModal = computed(() => {
      if (state.editModal) return 'Edit contact'
      return 'Add contact'
    })

    const closeDialog = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'modalContact',
        value: false,
      })
      store.commit('globalComponents/setContact', {})
    }

    const saveContact = async () => {
      form.value.validate(async (valid) => {
        if (valid) {
          let res = null
          if (state.contactId) {
            res = await updateContact({ form: contact, id: state.contactId })
          } else {
            res = await createContact({ data: contact, id: memberId })
          }
          responseUpdate(res)
        }
      })
    }

    const responseUpdate = (res) => {
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Update successfully',
        })
        queryClient.invalidateQueries(['contactsAll', memberId])
        closeDialog()
      }
    }

    const getPlaceholder = computed(() => {
      return dayjs(new Date()).format('MM/DD/YYYY')
    })

    return {
      state,
      contact,
      rules,
      form,

      closeDialog,
      getTitleModal,
      saveContact,
      getPlaceholder,
      updateContact,
      loadingUpdateContact,

      createContact,
      loadingCreateContact,
    }
  },
}
</script>

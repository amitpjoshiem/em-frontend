<template>
  <SwdDialog :title="getDialogTitle" confirm-action="changeName" destination-dialog="changeName">
    <template #buttonDialog>
      <div class="flex items-center">
        <InlineSvg :src="IconPencil" class="mb-1" />
      </div>
    </template>
    <template #contentDialog>
      <el-form v-if="data.isShowForm" ref="form" :model="ruleForm" :rules="rules" label-position="top">
        <el-form-item label="First name" prop="first_name" class="w-full mb-4">
          <el-input v-model="ruleForm.first_name" placeholder="Enter first name" />
        </el-form-item>
        <el-form-item label="Last name" prop="last_name" class="w-full">
          <el-input v-model="ruleForm.last_name" placeholder="Enter last name" />
        </el-form-item>
        <div class="pt-3 text-right">
          <SwdButton primary main :disabled="isLoading" class="w-2/12" @click="saveName">
            <SwdSpinner v-show="isLoading" class="mr-2" />
            Save
          </SwdButton>
        </div>
      </el-form>
      <SwdDialogSucces v-else text="The name was succesfully changed!" @closeDialog="closeDialog" />
    </template>
  </SwdDialog>
</template>
<script>
import IconPencil from '@/assets/svg/icon-pencil.svg'
import SwdDialogSucces from '@/components/Global/SwdDialogSucces.vue'
import { useUserProfile } from '@/api/use-user-profile.js'
import { useMutation, useQueryClient } from 'vue-query'
import { useStore } from 'vuex'
import { changeUser } from '@/api/vueQuery/change-user'
import { reactive, ref, onMounted, computed } from 'vue'
import { rules } from '@/validationRules/changeName.js'

export default {
  name: 'ChangeName',
  components: {
    SwdDialogSucces,
  },
  setup() {
    const store = useStore()
    const queryClient = useQueryClient()
    const form = ref(null)

    const ruleForm = reactive({
      first_name: '',
      last_name: '',
    })

    const data = reactive({
      isShowForm: true,
    })

    const { mutateAsync: changeUserNameProfile, isLoading, isError, isFetching, error } = useMutation(changeUser)

    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: user, refetch } = useUserProfile()

    onMounted(async () => {
      if (user.value.firstName) {
        ruleForm.first_name = user.value.firstName
      }
      if (user.value.lastName) {
        ruleForm.last_name = user.value.lastName
      }
    })

    const saveName = async (e) => {
      e.preventDefault()
      changeUserNameProfile({ form: ruleForm, id: user.value.id })
        .then(() => {
          queryClient.invalidateQueries(['users'])
          data.isShowForm = false
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const closeDialog = () => {
      data.isShowForm = true
      store.commit('globalComponents/setShowModal', {
        destination: 'changeName',
        value: false,
      })
    }

    const getDialogTitle = computed(() => {
      if (data.isShowForm) return 'Change name'
      return 'Succes'
    })

    return {
      changeUserNameProfile,
      isLoading,
      isError,
      isFetching,
      data,
      error,
      saveName,
      IconPencil,
      isLoadingUserProfile,
      isErrorUserProfile,
      user,
      refetch,
      ruleForm,
      form,
      rules,
      closeDialog,
      getDialogTitle,
    }
  },
}
</script>

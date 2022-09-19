<template>
  <div class="border border-color-grey rounded-lg my-5 p-5">
    <el-form ref="form" :model="ruleForm" label-position="top">
      <span class="text-main text-smm font-semibold">Notes</span>
      <el-form-item class="mt-5">
        <el-input v-model="ruleForm.notes" type="textarea" :rows="5" :autosize="false" />
      </el-form-item>
    </el-form>
    <div class="flex justify-end mt-5">
      <SwdButton primary main @click="submitForm('ruleForm')">Save</SwdButton>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAlert } from '@/utils/use-alert'
import { updateMembers } from '@/api/vueQuery/update-members'
import { useMutation } from 'vue-query'

export default {
  name: 'NotesMember',
  props: {
    notes: {
      type: String,
      require: false,
      default: '',
    },
  },
  setup(props) {
    const form = ref(null)
    const route = useRoute()
    const id = route.params.id
    const { mutateAsync: updateMember } = useMutation(updateMembers)

    const ruleForm = reactive({
      notes: '',
    })

    const submitForm = async () => {
      const res = await updateMember({ form: ruleForm, id })
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Member update successfully',
        })
      }
    }

    onMounted(async () => {
      if (props.notes) ruleForm.notes = props.notes
    })

    return {
      ruleForm,
      form,
      submitForm,
    }
  },
}
</script>

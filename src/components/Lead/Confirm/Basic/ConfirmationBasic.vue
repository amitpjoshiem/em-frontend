<template>
  <div v-if="$can('lead', 'all')" class="flex justify-end mb-4">
    <SwdButton primary small @click="edit">{{ isReadOnlyLead ? 'Show full info' : 'Edit' }}</SwdButton>
  </div>

  <!-- CLIENT -->
  <el-card class="mb-4 w-full sm:p-5">
    <div class="mb-5 text-main font-semibold">Client:</div>
    <div class="text-sm">
      <div class="flex text-main mb-2">
        <div class="pr-2 text-gray-500">Name:</div>
        <SwdStubForText :text="member.name" plug="&mdash;" class="text-sm text-main" />
      </div>

      <div class="flex text-main mb-2">
        <div class="pr-2 text-gray-500">E-mail:</div>
        <div class="text-main">{{ member.email }}</div>
      </div>

      <div class="flex text-main mb-2">
        <span class="text-gray-500 pr-2">Age:</span>
        <SwdStubForText :text="member.age" plug="&mdash;" class="text-sm text-main" />
      </div>

      <div class="flex text-main mb-2">
        <div class="pr-2 text-gray-500">Retired:</div>
        <div class="text-main">
          <SwdRetiredLabel :retired="member.retired" />
        </div>
      </div>
    </div>
  </el-card>

  <!-- SPOUSE -->
  <el-card class="mb-4 w-full sm:p-5">
    <div class="mb-5 text-main font-semibold">Spouse/Partner:</div>
    <div class="text-sm">
      <template v-if="member.married">
        <div class="flex text-main mb-2">
          <div class="pr-2 text-gray-500">Spouse/Partner Name:</div>
          <div class="text-main">{{ member.spouse.first_name + ' ' + member.spouse.last_name }}</div>
        </div>
        <div class="flex text-main mb-2">
          <div class="pr-2 text-gray-500">Spouse/Partner E-mail:</div>
          <div class="text-main">{{ member.spouse.email }}</div>
        </div>
        <div class="flex text-main mb-2">
          <span class="text-gray-500 pr-2">Spouse/Partner Age:</span>
          <span class="">{{ member.spouse.age }}</span>
        </div>
      </template>
      <div v-if="member.married" class="flex text-main mb-2">
        <div class="pr-2 text-gray-500">Spouse/Partner retired:</div>
        <div class="text-main">
          <SwdRetiredLabel :retired="member.spouse.retired" />
        </div>
      </div>
    </div>
  </el-card>

  <!-- ADDRESS -->
  <el-card class="mb-4 w-full sm:p-5">
    <div class="mb-5 text-main font-semibold">Contacts:</div>
    <div class="text-sm">
      <div class="flex text-main mb-2">
        <div class="pr-2 text-gray-500">Address:</div>
        <SwdStubForText :text="member.address" plug="&mdash;" class="text-sm text-main" />
      </div>
      <div class="flex text-main mb-2">
        <div class="pr-2 text-gray-500">City:</div>
        <SwdStubForText :text="member.city" plug="&mdash;" class="text-sm text-main" />
      </div>
      <div class="flex text-main mb-2">
        <span class="text-gray-500 pr-2">State:</span>
        <SwdStubForText :text="member.state" plug="&mdash;" class="text-sm text-main" />
      </div>
      <div class="flex text-main mb-2">
        <span class="text-gray-500 pr-2">Zip:</span>
        <SwdStubForText :text="member.zip" plug="&mdash;" class="text-sm text-main" />
      </div>
      <div class="flex text-main mb-2">
        <span class="text-gray-500 pr-2">Phone:</span>
        <SwdStubForText :text="member.phone" plug="&mdash;" class="text-sm text-main" />
      </div>
    </div>
  </el-card>

  <el-card>
    <MoreInfoAbout />
  </el-card>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import MoreInfoAbout from '@/components/Lead/AddLeadInformation/MoreInfoAbout.vue'

export default {
  name: 'ConfirmationInformation',
  components: {
    MoreInfoAbout,
  },
  props: {
    member: {
      type: Object,
      require: true,
      default: () => {},
    },
    isReadOnlyLead: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const edit = () => {
      router.push({ name: 'lead-basic-information', params: { id: route.params.id } })
    }

    return {
      edit,
    }
  },
}
</script>

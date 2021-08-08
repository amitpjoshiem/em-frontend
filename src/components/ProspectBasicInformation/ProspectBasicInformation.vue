<template>
  <div class="p-5">
    <SubHeader
      title="New opportunity"
      back-page="prospect-details"
      back-page-title="Prospect details"
    />

    <pre>
      data:
      {{ data }}
    </pre>
    <pre>
      house:
      {{ house }}
    </pre>
    <pre>
      spouse:
      {{ spouse }}
    </pre>
    <pre>
      employment:
      {{ employment }}
    </pre>
    <pre>
      other:
      {{ other }}
    </pre>
  </div>
</template>
<script>
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { useRoute } from 'vue-router'

export default {
  name: 'ProspectBasicInformation',
  setup() {
    const route = useRoute()
    const id = route.params.id

    const { isLoading, isError, data, house, spouse, employment, other } =
      useProspectDetails(id)

    return {
      isLoading,
      isError,
      data,
      house,
      spouse,
      employment,
      other,
    }
  },
}
</script>

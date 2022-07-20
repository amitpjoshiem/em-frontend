<template>
  <div class="flex justify-between">
    <div
      class="signpost"
      :class="{
        'step-complet': active > 1,
        'step-current': active === 1,
      }"
      @click="setActive(1)"
    >
      <p>1st Appointment</p>
    </div>
    <div
      class="signpost"
      :class="{
        'step-complet': active > 2,
        'step-no-complet': active < 2,
        'step-current': active === 2,
      }"
      @click="setActive(2)"
    >
      <p>2nd Appointment</p>
    </div>
    <div
      class="signpost"
      :class="{
        'step-complet': active > 3,
        'step-no-complet': active < 3,
        'step-current': active === 3,
      }"
      @click="setActive(3)"
    >
      <p>3rd Appointment</p>
    </div>
    <div
      class="signpost"
      :class="{
        'step-complet': active > 4,
        'step-no-complet': active < 4,
        'step-current': active === 4,
      }"
      @click="setActive(4)"
    >
      <p>Place Holder Acct</p>
    </div>
    <div
      class="signpost"
      :class="{
        'step-complet': active > 5,
        'step-no-complet': active < 5,
        'step-current': active === 5,
      }"
      @click="setActive(5)"
    >
      <p>Paperwork Signed</p>
    </div>
    <div
      class="signpost"
      :class="{
        'step-complet': active > 6,
        'step-no-complet': active < 6,
        'step-current': active === 6,
      }"
      @click="setActive(6)"
    >
      <p>Commission Paid</p>
    </div>
    <div
      class="signpost flex-col"
      :class="{
        'step-complet': active > 7,
        'step-no-complet': active < 7,
        'step-current': active === 7,
      }"
      @click="setActive(7)"
    >
      <p>Contract delivery/</p>
      <p>Free look period</p>
    </div>
    <div
      class="signpost"
      :class="{
        'step-no-complet': active < 8,
        'step-current': active === 8,
      }"
      @click="setActive(8)"
    >
      <p>Closed</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'MemberStep',
  setup() {
    const active = ref(1)

    const setActive = (step) => {
      active.value = step
      useAlert({
        title: 'Success',
        type: 'success',
        message: 'Information update successfully',
      })
    }

    return {
      active,
      setActive,
    }
  },
}
</script>

<style scoped>
.signpost {
  cursor: pointer;
  width: 12.5%;
  height: 40px;
  clip-path: polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%, 6% 50%);
  shape-outside: polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%, 6% 50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.signpost p {
  font-size: 11px;
  text-align: center;
}

.step-no-complet {
  background-color: rgb(243, 243, 243);
}

.step-no-complet p {
  color: #000;
}

.step-complet {
  background-color: #6ebaff;
}

.step-complet p {
  color: #fff;
}

.step-current {
  background-color: #042d52;
}
.step-current p {
  color: #fff;
}
</style>

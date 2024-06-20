<script setup lang="ts">
import CommonButton from "../Common/CommonButton.vue";

const emit = defineEmits<{
  (e: "confirmClick"): void;
}>();
</script>

<template>
  <CommonButton
    buttonBackground="#202123"
    buttonBorderColor="#202123"
    borderWeight="2px"
    buttonColor="#fff"
    :buttonBold="true"
    buttonTitle="SIM"
    @buttonClick="$emit('confirmClick')"
  >
    SIM
  </CommonButton>
</template>

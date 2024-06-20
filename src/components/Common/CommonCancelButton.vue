<script setup lang="ts">
import CommonButton from "../Common/CommonButton.vue";

const emit = defineEmits<{
  (e: "cancelClick"): void;
}>();
</script>

<template>
  <CommonButton
    buttonBackground="#fff"
    buttonBorderColor="#202123"
    borderWeight="2px"
    buttonColor="#202123"
    :buttonBold="true"
    buttonTitle="CANCELAR"
    @buttonClick="$emit('cancelClick')"
  >
    CANCELAR
  </CommonButton>
</template>
F

<template>
  <CommonButton
    buttonBackground="#fff"
    buttonBorderColor="#202123"
    borderWeight="2px"
    buttonColor="#202123"
    :buttonBold="true"
    buttonTitle="SELECIONE OUTRO ARQUIVO"
    @buttonClick="$emit('selectAnotherFileClick')"
  >
    SELECIONE OUTRO ARQUIVO
  </CommonButton>
</template>

<script setup lang="ts">
import CommonButton from "../Common/CommonButton.vue";

const emit = defineEmits<{
  (e: "selectAnotherFileClick"): void;
}>();
</script>

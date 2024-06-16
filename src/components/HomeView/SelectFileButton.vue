<template>
    <CommonButton
      buttonBackground="#fff"
      buttonBorderColor="#0273c3"
      borderWeight="2px"
      buttonColor="#0273c3"
      buttonBold
      buttonTitle="SELECIONE UM ARQUIVO DO SEU DISPOSITIVO"
      @buttonClick="$emit('selectFileClick')"
    >
      SELECIONE UM ARQUIVO DO SEU DISPOSITIVO
    </CommonButton>
  </template>
  
  <script setup lang="ts">
  import CommonButton from "../Common/CommonButton.vue";
  
  const emit = defineEmits<{
    (e: "selectFileClick"): void;
  }>();
  </script>
  
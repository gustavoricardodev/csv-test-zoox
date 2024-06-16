<template>
    <CommonButton
      buttonBackground="#fff"
      buttonBorderColor="#333"
      borderWeight="1px"
      buttonColor="#333"
      :buttonBold="false"
      buttonTitle="Cancelar"
      @buttonClick="$emit('cancelClick')"
    >
      Cancelar
    </CommonButton>
  </template>
  
  <script setup lang="ts">
  import CommonButton from "../Common/CommonButton.vue";
  
  const emit = defineEmits<{
    (e: "cancelClick"): void;
  }>();
  </script>
  
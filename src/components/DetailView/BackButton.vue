<script setup lang="ts">
import CommonButton from "../Common/CommonButton.vue";

const emit = defineEmits<{
  (e: "backButtonClick"): void;
}>();
</script>

<template>
  <CommonButton
    buttonBackground="#fff"
    buttonBorderColor="#202123"
    borderWeight="1px"
    buttonColor="#202123"
    :buttonBold="false"
    buttonTitle="Voltar"
    @buttonClick="$emit('backButtonClick')"
  >
    <template #image>
      <img
        src="../../assets/img/back-icon.svg"
        width="12"
        height="12"
        alt="Ícone de voltar"
        title="Ícone de voltar"
      />
    </template>
    Voltar
  </CommonButton>
</template>

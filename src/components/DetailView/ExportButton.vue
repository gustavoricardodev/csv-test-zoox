<script setup lang="ts">
import CommonButton from "../Common/CommonButton.vue";

const emit = defineEmits<{
  (e: "exportButtonClick"): void;
}>();
</script>

<template>
  <CommonButton
    buttonBackground="#fff"
    buttonBorderColor="#202123"
    borderWeight="1px"
    buttonColor="#202123"
    :buttonBold="false"
    buttonTitle="Exportar tabela"
    @buttonClick="$emit('exportButtonClick')"
  >
    <template #image>
      <img
        src="../../assets/img/export-icon.svg"
        width="12"
        height="13"
        alt="Ícone de exportar"
        title="Ícone de exportar"
      />
    </template>
    Exportar tabela
  </CommonButton>
</template>

<template>
  <CommonButton
    buttonBackground="#fff"
    buttonBorderColor="#333"
    borderWeight="1px"
    buttonColor="#333"
    :buttonBold="false"
    buttonTitle="Importar CSV"
    @buttonClick="$emit('importButtonClick')"
  >
    <template #image>
      <img
        src="../../assets/img/plus-icon.svg"
        width="7"
        height="7"
        alt="Ícone de adicionar"
        title="Ícone de adicionar"
      />
    </template>
    Importar CSV
  </CommonButton>
</template>

<script setup lang="ts">
import CommonButton from "../Common/CommonButton.vue";

const emit = defineEmits<{
  (e: "importButtonClick"): void;
}>();
</script>

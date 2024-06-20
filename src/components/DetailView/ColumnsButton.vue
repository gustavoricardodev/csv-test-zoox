<script setup lang="ts">
import CommonButton from "../Common/CommonButton.vue";

const emit = defineEmits<{
  (e: "columnsButtonClick"): void;
}>();
</script>

<template>
  <CommonButton
    buttonBackground="#fff"
    buttonBorderColor="#202123"
    borderWeight="1px"
    buttonColor="#202123"
    :buttonBold="false"
    buttonTitle="Colunas"
    @buttonClick="$emit('columnsButtonClick')"
  >
    <template #image>
      <img
        src="../../assets/img/columns-icon.svg"
        width="12"
        height="12"
        alt="Colunas"
        title="Colunas"
      />
    </template>
    Colunas
  </CommonButton>
</template>

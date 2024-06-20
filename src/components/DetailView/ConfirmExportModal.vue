<script setup lang="ts">
import Modal from "../Common/CommonModal.vue";
import CancelButton from "../Common/CommonCancelButton.vue";
import ConfirmButton from "../Common/CommonConfirmButton.vue";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue", "confirmExport"]);

const handleCancelClick = () => {
  emit("update:modelValue", false);
};

const handleConfirmClick = () => {
  emit("confirmExport");
  emit("update:modelValue", false);
};
</script>

<template>
  <Modal
    class="confirmExport"
    :modelValue="props.modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <div>
      <p class="confirmExport__title">Deseja Exportar E Baixar a Tabela</p>
      <div class="confirmExport__actions">
        <CancelButton @click="handleCancelClick" />
        <ConfirmButton @click="handleConfirmClick" />
      </div>
    </div>
  </Modal>
</template>

<style>
.confirmExport .modal__content {
  max-width: 273px;
}
</style>

<style scoped>
.confirmExport__title {
  font-family: Roboto;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.confirmExport__actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.625rem;
}
</style>

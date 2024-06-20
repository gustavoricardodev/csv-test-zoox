<script setup lang="ts">
import Modal from "../Common/CommonModal.vue";
import CancelButton from "./CancelButton.vue";
import ConfirmButton from "./ConfirmButton.vue";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue", "confirmDeleteFile"]);

const handleCancelClick = () => {
  emit("update:modelValue", false);
};

const handleConfirmClick = () => {
  emit("confirmDeleteFile");
  emit("update:modelValue", false);
};
</script>

<template>
  <Modal
    class="confirmDeleteModal"
    :modelValue="props.modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <div>
      <p class="confirmDeleteModal__title">Deseja Excluir a Tabela?</p>
      <div class="confirmDeleteModal__actions">
        <CancelButton @click="handleCancelClick"/>
        <ConfirmButton @click="handleConfirmClick"/>
      </div>
    </div>
  </Modal>
</template>

<style>
.confirmDeleteModal .modal__content {
  max-width: 273px;
}
</style>

<style scoped>
.confirmDeleteModal__title {
  font-family: Roboto;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.confirmDeleteModal__actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.625rem;
}
</style>

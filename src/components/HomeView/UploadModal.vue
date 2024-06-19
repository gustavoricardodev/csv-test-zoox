<script setup lang="ts">
import Modal from "../Common/CommonModal.vue";
import CancelButton from "./CancelButton.vue";
import UploadArea from "./DragAndDropUploader.vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const handleCancelClick = () => {
  emit("update:modelValue")
};
const handleSelectFileClick = () => {};
</script>

<template>
  <Modal
    :modelValue="props.modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <div class="uploadModal">
      <p class="uploadModal__title">escolha um arquivo a ser importado</p>

      <UploadArea @closeUploader="emit('update:modelValue', false)"/>

      <CancelButton class="uploadModal__cancel--button" @cancelClick="handleCancelClick" />
    </div>
  </Modal>
</template>

<style scoped>
.uploadModal {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.uploadModal__title {
  color: var(--black-color);
  font-family: Roboto;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.2;
  text-transform: capitalize;
}

.uploadModal__select-file {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 16px;
  border: 1px dashed var(--medium-gray-color);
  padding: 36px;
}

.uploadModal__cancel--button {
  align-self: flex-end;
}
</style>

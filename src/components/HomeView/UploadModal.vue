<script setup lang="ts">
import Modal from '../Common/CommonModal.vue';

const props = defineProps<{
  uploadModalState: boolean;
}>();

const emit = defineEmits(["changeUploadModalState"]);

const changeUploadModalState = () => {
  emit("changeUploadModalState");
}

</script>

<template>
  <div>
    <Modal v-model="props.uploadModalState" @modelValue="changeUploadModalState">
      <p>modalzinho dos cria</p>
    </Modal>
  </div>
</template>

<style>
.app {
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>

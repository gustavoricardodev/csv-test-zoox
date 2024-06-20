<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const isVisible = ref(props.modelValue);

const closeModal = () => {
  isVisible.value = false;
  emit("update:modelValue", false);
};

const keyHandler = (event: KeyboardEvent) => {
  if (event.key === "Escape") closeModal();
};

watch(
  () => props.modelValue,
  (newVal) => {
    isVisible.value = newVal;
  }
);

onMounted(() => {
  document.addEventListener("keydown", keyHandler);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyHandler);
});
</script>

<template>
  <div v-if="isVisible" class="modal" @click="closeModal">
    <div class="modal__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal__content {
  background: white;
  padding: 1rem;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.2s;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>

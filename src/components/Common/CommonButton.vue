<template>
  <button class="commonButton" :class="buttonClass" @click="handleClick" :title="buttonTitle">
    <slot name="image"></slot>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
  theme: 'dark' | 'white';
  buttonTitle: string;
}>();

const emit = defineEmits<{
  (e: 'button-click'): void;
}>();

const buttonClass = computed(() => {
  return props.theme === 'dark' ? 'commonButton__dark' : 'commonButton__white';
});

const handleClick = () => {
  emit('button-click');
};
</script>

<style scoped>
.commonButton {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.1875rem 0.5rem;
  border: 1px solid var(--dark-gray-color);
  border-radius: 15px;
  cursor: pointer;
  font-family: Roboto;
  font-size: 0.8125rem;
  font-weight: 400;
  transition: opacity .2s;
}

.commonButton__dark {
  background-color: var(--dark-gray-color);
  color: var(--white-color);
}

.commonButton__white {
  background-color: var(--white-color);
  color: var(--dark-gray-color);
}
</style>

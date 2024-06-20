<template>
  <button
    class="commonButton"
    @click="handleClick"
    :title="buttonTitle"
    :style="buttonStyle"
  >
    <slot name="image"></slot>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  buttonBorderColor: string;
  borderWeight: string;
  buttonColor: string;
  buttonBold: boolean;
  buttonBackground: string;
  buttonTitle: string;
}>();

const emit = defineEmits<{
  (e: "buttonClick"): void;
}>();

const buttonStyle = computed(() => {
  return {
    borderColor: props.buttonColor,
    color: props.buttonColor,
    fontWeight: props.buttonBold ? "700" : "400",
    border: `${props.borderWeight} solid ${props.buttonBorderColor}`,
    background: props.buttonBackground
  };
});

const handleClick = () => {
  emit("buttonClick");
};
</script>

<style scoped>
.commonButton {
  cursor: pointer;
  font-family: Roboto;
  padding: 0.1875rem 0.5rem;
  font-size: 0.8125rem;
  border-radius: 15px;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0);
  transition: all 0.2s;
}

.commonButton:hover {
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.15);
}
</style>

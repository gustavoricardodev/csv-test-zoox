<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  headers: string[];
  visibleColumns: boolean[];
  modelValue: boolean;
}>();

const emits = defineEmits<{
  (e: "toggleColumn", index: number): void;
  (e: "showAllColumns"): void;
  (e: "hideAllColumns"): void;
}>();

const handleToggleColumn = (index: number) => {
  emits("toggleColumn", index);
};

const handleShowAllColumns = () => {
  emits("showAllColumns");
};

const handleHideAllColumns = () => {
  emits("hideAllColumns");
};
</script>

<template>
  <div class="columns-toggle" v-if="modelValue">
    <button @click="handleShowAllColumns" class="columns-toggle__action-button">
      <img
        src="../../assets/img/copy-icon.svg"
        alt="Mostrar todas as Colunas"
        title="Mostrar todas as Colunas"
        width="16"
        height="16"
      />
      Mostrar todas as Colunas
    </button>
    <button @click="handleHideAllColumns" class="columns-toggle__action-button">
      <img
        src="../../assets/img/copy-icon.svg"
        alt="Esconder todas as Colunas"
        title="Esconder todas as Colunas"
        width="16"
        height="16"
      />
      Esconder todas as Colunas
    </button>

    <hr class="columns-toggle__divider" />

    <div
      v-for="(header, index) in headers"
      :key="'toggle-' + index"
      class="columns-toggle__item"
    >
      <label class="columns-toggle__label">
        <span class="columns-toggle__toggle-container">
          <div class="columns-toggle__icon-label">
            <img
              src="../../assets/img/copy-icon.svg"
              :alt="header"
              :title="header"
              width="16"
              height="16"
            />
            <span class="columns-toggle__text">{{ header }}</span>
          </div>
          <button
            class="columns-toggle__switch"
            :class="{ 'columns-toggle__switch--active': visibleColumns[index] }"
            @click="handleToggleColumn(index)"
          ></button>
        </span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.columns-toggle {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 15px;
  padding: 1rem;
  gap: 6px;
  background: var(--white-color);
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: calc(100% + 12px);
}

.columns-toggle::before {
  content: "";
  width: 16px;
  height: 16px;
  background: var(--white-color);
  position: absolute;
  top: -6px;
  left: 32px;
  border-radius: 5px;
  transform: rotate(45deg);
}

.columns-toggle__action-button {
  background-color: var(--white-color);
  border: none;
  text-align: start;
  padding: 4px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.columns-toggle__divider {
  border: 1px solid var(--light-gray-color);
}

.columns-toggle__item {
  display: flex;
  gap: 0.3125rem;
}

.columns-toggle__label {
  width: 100%;
  padding: 0.25rem 0;
}

.columns-toggle__toggle-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.625rem;
}

.columns-toggle__icon-label {
  display: flex;
  align-items: center;
  gap: 0.3125rem;
}

.columns-toggle__switch {
  display: inline-block;
  width: 34px;
  height: 14px;
  background: #ccc;
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  transition: background-color 0.3s;
}

.columns-toggle__switch::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -4px;
  transform: translate(0, -50%);
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.15);
}

.columns-toggle__switch--active {
  background: #75bae0;
}

.columns-toggle__switch--active::before {
  transform: translate(20px, -50%);
  background: var(--dark-blue-color);
}

.columns-toggle__text {
  font-size: 16px;
  color: #333;
}
</style>

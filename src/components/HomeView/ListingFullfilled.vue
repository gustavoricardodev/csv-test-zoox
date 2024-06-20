<template>
  <div class="home__listing-fullfilled">
    <ul class="home__listing-fullfilled-header">
      <li>Nome</li>
      <li>Número De Colunas</li>
      <li>Número de Linhas</li>
      <li>Exportado</li>
      <li>Criado Em</li>
      <li>Download</li>
      <li>Excluir</li>
    </ul>
    <ul
      v-for="(file, index) in files"
      :key="file.name ?? index"
      class="home__listing-fullfilled-item"
      @click="goToDetail(file.id)"
    >
      <li>{{ file.name }}</li>
      <li>{{ file.columnCount }} colunas</li>
      <li>{{ file.rowCount }} linhas</li>
      <li>Exportado</li>
      <li>{{ file.createdAt }}</li>
      <li>
        <button @click.stop="downloadFile(file)" :title="'Baixar ' + file.name">
          <img
            src="../../assets/img/download-icon.svg"
            :alt="'Baixar ' + file.name"
            width="16"
            height="16"
          />
        </button>
      </li>
      <li>
        <button @click.stop="deleteFile(file.id)" :title="'Excluir ' + file.name">
          <img
            src="../../assets/img/trash-icon.svg"
            :alt="'Excluir ' + file.name"
            width="16"
            height="16"
          />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { type CsvFile } from "@/types/csv-file";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps<{
  files: CsvFile[];
}>();

const emit = defineEmits(["downloadFile", "deleteFile"]);

const downloadFile = (file: CsvFile) => {
  emit("downloadFile", file);
};

const deleteFile = (fileId: string) => {
  emit("deleteFile", fileId);
};

const goToDetail = (fileId: string) => {
  router.push(`detail/${fileId}`);
};
</script>

<style scoped>
.home__listing-fullfilled ul {
  border-bottom: 1px solid var(--light-gray-color);
  min-width: 768px;
}

.home__listing-fullfilled-item {
  transition: all 0.2s;
}

.home__listing-fullfilled-item:hover {
  cursor: pointer;
  background-color: var(--background);
}

.home__listing-fullfilled-header,
.home__listing-fullfilled-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 100px 100px 100px;
  align-items: center;
}

.home__listing-fullfilled-header li:nth-last-child(-n + 2) {
  text-align: center;
}

.home__listing-fullfilled-header li,
.home__listing-fullfilled-item li {
  list-style: none;
  font-family: Roboto;
  font-size: 0.8125rem;
  color: var(--black-color);
  padding: 1rem;
}

.home__listing-fullfilled-header li {
  font-weight: 700;
}

.home__listing-fullfilled-item button {
  width: 100%;
  background: none;
  cursor: pointer;
  border: none;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import ImportButton from "../components/HomeView/ImportButton.vue";
import UploadModal from "../components/HomeView/UploadModal.vue";

interface CsvFile {
  data: Record<string, unknown>[];
  rowCount: number;
  columnCount: number;
  createdAt: string;
  name: string;
}


const parsedUploadedFiles = ref<CsvFile[]>([]);

onMounted(() => {
  const uploadedFiles = localStorage.getItem('uploadedFiles')
  if(uploadedFiles?.length) {
    parsedUploadedFiles.value = JSON.parse(uploadedFiles)
  }
})

const uploadModal = ref(false);
const openUploadModal = () => {
  uploadModal.value = true;
};
</script>

<template>
  <main class="home">
    <transition name="fade">
      <UploadModal v-model="uploadModal" />
    </transition>

    <div class="home__top">
      <p class="home__top-title">Seus Arquivos</p>
      <ImportButton @importButtonClick="openUploadModal" />
    </div>

    <div class="home__listing">
      <div class="home__listing-fullfilled" v-if="parsedUploadedFiles.length">
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
          v-for="(file, index) in parsedUploadedFiles"
          :key="file?.name ?? index"
          class="home__listing-fullfilled-item"
        >
          <li>{{ file.name }}</li>
          <li>{{ file.columnCount }} colunas</li>
          <li>{{ file.rowCount }} linhas</li>
          <li>Exportado</li>
          <li>{{ file.createdAt }}</li>
          <li :title="'Baixar ' + file.name">
            <img
              src="../assets/img/download-icon.svg"
              :alt="'Baixar ' + file.name"
              width="16"
              height="16"
            />
          </li>
          <li :title="'Excluir ' + file.name">
            <img
              src="../assets/img/trash-icon.svg"
              :alt="'Excluir ' + file.name"
              width="16"
              height="16"
            />
          </li>
        </ul>
      </div>

      <div class="home__listing-empty" v-else>
        <div class="home__listing-empty-wrapper">
          <img
            src="../assets/img/table-icon.svg"
            width="96"
            height="75"
            alt="Imagem de uma tabela"
            title="Imagem de uma tabela"
          />
          <p><strong>Sem tabelas importadas</strong></p>
          <p>Importe clicando no botão acima “importar csv” para começar</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
}

.home__top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home__top-title {
  font-family: Roboto;
  font-size: 1.0625rem;
  font-weight: 300;
  color: var(--black-color);
}

.home__listing-fullfilled-header,
.home__listing-fullfilled-item {
  display: grid;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 100px 100px 100px;
  align-items: center;
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

.home__listing-fullfilled-item {
  border-top: 1px solid var(--light-gray-color);
  border-bottom: 1px solid var(--light-gray-color);
}

.home__listing {
  border-radius: 15px;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.15);
  background-color: var(--white-color);
  flex: 1;
  overflow: hidden;
}

.home__listing-empty {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home__listing-empty-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home__listing-empty img {
  margin-bottom: 2.125rem;
}

.home__listing-empty p {
  font-size: 13px;
  color: var(--black-color);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

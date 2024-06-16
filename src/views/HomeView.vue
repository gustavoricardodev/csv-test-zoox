<script setup lang="ts">
import { ref } from "vue";

import ImportButton from "../components/HomeView/ImportButton.vue";
import UploadModal from "../components/HomeView/UploadModal.vue";

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
      <div class="home__listing-empty">
        <div class="home__listing-empty-wrapper">
          <img
            src="../assets/img/table.svg"
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

.home__listing {
  border-radius: 15px;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.15);
  background-color: var(--white-color);
  flex: 1;
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

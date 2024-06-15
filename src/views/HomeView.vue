<script setup lang="ts">
import CommonButton from "../components/Common/CommonButton.vue";

const handleButtonClick = () => {
  console.log("Button clicado");
};
</script>

<template>
  <main class="home">

    <div class="home__top">
      <p class="home__top-title">Seus Arquivos</p>
      <CommonButton theme="white" button-title="Importar CSV" @button-click="handleButtonClick">
        <template #image>
          <img src="../assets/img/plus-icon.svg" width="7" height="7" alt="Ícone de adicionar" title="Ícone de adicionar" />
        </template>
        Importar CSV
      </CommonButton>
    </div>

    <div class="home__listing">
      <div class="home__listing-empty">
        <div class="home__listing-empty-wrapper">
          <img src="../assets/img/table.svg" width="96" height="75" alt="Imagem de uma tabela" title="Imagem de uma tabela">
          <p><strong>Sem tabelas importadas</strong></p>
          <p>Importe clicando no botão acima “importar csv” para começar</p>
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
.home {
  background: url();
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
</style>

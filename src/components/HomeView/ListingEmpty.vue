<template>
  <div class="home__listing-empty">
    <div class="home__listing-empty-wrapper">
      <img
        src="../../assets/img/table-icon.svg"
        width="96"
        height="75"
        alt="Imagem de uma tabela"
        title="Imagem de uma tabela"
      />
      <p><strong>Sem tabelas importadas</strong></p>
      <p>Importe clicando no botão acima “importar csv” para começar</p>
    </div>
  </div>
</template>

<style scoped>
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
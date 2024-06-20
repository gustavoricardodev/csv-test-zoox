<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Breadcrumb from './components/Default/Breadcrumb.vue';
</script>

<template>
  <div class="app">
    <header>
      <Breadcrumb />
    </header>

    <RouterView class="router-view" />
  </div>
</template>

<style>
.app {
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  padding: 1rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Breadcrumb from "./components/Breadcrumb.vue";
</script>

<template>
  <header>
    <Breadcrumb />
  </header>

  <main>
    <hr />

    <nav>
      <RouterLink to="/">Home</RouterLink> -
      <RouterLink to="/detail/1">detail</RouterLink>
    </nav>

    <hr />

    <RouterView />
  </main>
</template>

<style scoped></style>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Breadcrumb from "./components/Default/Breadcrumb.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="app">
    <header>
      <Breadcrumb />
    </header>

    <router-view v-slot="{ Component }">
      <transition
        :name="(route.meta.transition as string) || 'fade'"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.app {
  width: 100vw;
  height: 100vh;
  /* max-height: 100vh; */
  overflow: hidden;
  padding: 1rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.slide-left-enter-active {
  transition: all 0.2s ease-out;
}

.slide-left-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-right-enter-active {
  transition: all 0.2s ease-out;
}

.slide-right-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>

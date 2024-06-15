<template>
  <nav aria-label="breadcrumb">
    <ul class="breadcrumb">
      <li class="breadcrumb__item">
        <router-link :class="{ active: isOnHomePage }" to="/">Início</router-link>
      </li>

      <template v-if="!isOnHomePage">
        <li
          v-for="(breadcrumbItem, index) in breadcrumb"
          :key="breadcrumbItem.path + index"
          class="breadcrumb__item"
        >
          <router-link :to="breadcrumbItem.path" v-if="!breadcrumbItem.active">
            {{ breadcrumbItem.name }}
          </router-link>
          <span class="active" v-else>
            {{ breadcrumbItem.name }}
          </span>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

interface Breadcrumb {
  name: string;
  path: string;
  active: boolean;
}

const route = useRoute();
const breadcrumb = ref<Breadcrumb[]>([]);

const isOnHomePage = computed(() => route.path === "/");

watchEffect(() => {
  breadcrumb.value = route.matched.map((breadcrumb, index) => {
    return {
      name: breadcrumb.meta.breadcrumbLabel as string,
      path: breadcrumb.path,
      active: index === route.matched.length - 1,
    };
  });
});
</script>

<style scoped>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
}

.breadcrumb__item + .breadcrumb__item::before {
  content: url(../assets/img/breadcrumb-arrow.svg);
  margin: 0 0.9375rem;
}

.breadcrumb__item a,
.breadcrumb__item span {
  font-family: Roboto;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--dark-blue-color);
  text-decoration: none;
}

.breadcrumb__item .active {
  color: var(--dark-blue-color);
  font-weight: 700;
  user-select: none;
  cursor: not-allowed;
}
</style>

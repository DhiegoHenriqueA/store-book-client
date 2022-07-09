<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "@/stores/category";

const categoriesStore = useCategoryStore();

const categories = ref({
  id: "",
  description: "",
});

onMounted(() => {
  categoriesStore.getAllCategories();
});
</script>
<template>
  <button v-for="category of categoriesStore.categories" :key="category.id">
    {{ category.name }}
  </button>
</template>

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
  <q-tabs>
    <q-tab
      v-for="category of categoriesStore.categories"
      :key="category.id"
      :name="category.name"
      :label="category.name"
    ></q-tab>
  </q-tabs>
</template>

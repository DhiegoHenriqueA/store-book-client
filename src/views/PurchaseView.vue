<script setup lang="ts">
import { useRoute } from 'vue-router'
import PurchaseBook from '@/components/products/PurchaseBook.vue';
import { useBookStore } from "@/stores/book";
import { onMounted } from 'vue';
const booksStore = useBookStore();
const route = useRoute();

onMounted(async() => {
  await booksStore.getBook(route.params.id as string);
});
</script>
<template>
    <PurchaseBook :data="booksStore.books"/>
</template>
<style scoped>
</style>    
<script setup lang="ts">
import { useRouter } from "vue-router";
import ListCategory from "@/components/category/ListCategory.vue";
const router = useRouter();
</script>

<template>
  <header class="bg-teal-6">
    <div>
      <router-link :to="{ name: 'login' }">Entre</router-link>
      <router-link :to="{ name: 'registration' }">Crie a sua conta</router-link>
    </div>
    <div>
      <ListCategory />
    </div>
  </header>
  <router-view />
  <footer class="bg-teal-6"></footer>
</template>

<style>
header,
footer {
  height: 15vh;
  display: block;
}
</style>

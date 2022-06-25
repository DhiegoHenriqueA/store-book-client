<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <header>
    <router-link :to="{ name: 'login' }">Entre</router-link>
    <router-link :to="{ name: 'registration' }">Crie a sua conta</router-link>
  </header>
  <router-view />
  <footer></footer>
</template>

<style>
header,
footer {
  background-color: aquamarine;
  height: 15vh;
  display: block;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useBookStore } from "@/stores/book";
import CardBook from "../components/products/CardBook.vue";

const booksStore = useBookStore();

onMounted(() => {
  booksStore.getAllBooks();
});
</script>

<template>
  <div class="q-pa-lg bg-blue-grey-1">
    <div>
      <q-card class="no-border no-shadow bg-transparent">
        <q-card-section class="q-pa-sm">
          <q-input
            rounded
            v-model="search"
            outlined
            placeholder="Search Product"
          >
            <template v-slot:append>
              <q-icon v-if="search === ''" name="search" />
              <q-icon
                v-else
                name="clear"
                class="cursor-pointer"
                @click="search = ''"
              />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-col-gutter-sm">
      <div
        class="col-md-3 col-lg-3 col-sm-12 col-xs-12 q-pa-lg"
        v-for="book of booksStore.books"
      >
        <CardBook :data="book" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

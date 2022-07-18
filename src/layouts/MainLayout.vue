<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import ListCategory from "@/components/category/ListCategory.vue";

const router = useRouter();
const userStore = useUserStore();

const logout = () => {
  userStore.logout();
  router.push({
    name: "login",
  });
};
</script>

<template>
  <q-layout view="lHh lpr lFf" style="height: 400px">
    <q-header elevated class="bg-teal-6">
      {{ userStore }}
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          <q-toolbar>
            <q-space></q-space>
            <q-avatar>
              <img
                src="https://w7.pngwing.com/pngs/732/9/png-transparent-computer-icons-book-open-book-angle-rectangle-logo.png"
              />
            </q-avatar>

            <q-toolbar-title>Store Book</q-toolbar-title>
            <q-card
              class="no-border no-shadow bg-transparent"
              style="width: 300px"
            >
              <q-card-section class="q-pa-sm">
                <q-input v-model="search" placeholder="Buscar livro">
                  <template v-slot:append>
                    <q-icon v-if="!search" name="search" />
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
            <q-space></q-space>
          </q-toolbar>
        </div>
        <div class="col-3">
          <q-toolbar>
            <q-space></q-space>
            <div
              class="q-gutter-sm row items-center no-wrap"
              style="margin-top: 15px"
            >
              <div v-if="userStore.loggedIn" class="q-mr-lg">
                <q-btn
                  round
                  dense
                  flat
                  icon="fas fa-heart"
                  style="color: #9d4182 !important"
                  type="a"
                  href="https://github.com/sponsors/pratik227"
                  target="_blank"
                >
                </q-btn>
                <q-btn round dense flat color="white" icon="notifications">
                  <q-badge color="red" text-color="white" floating> 5 </q-badge>
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <messages></messages>
                      <q-card class="text-center no-shadow no-border">
                        <q-btn
                          label="View All"
                          style="max-width: 120px !important"
                          flat
                          dense
                          class="text-indigo-8"
                        >
                        </q-btn>
                      </q-card>
                    </q-list>
                  </q-menu>
                </q-btn>
                <!-- TODO-Deixar dinamico o carrinho -->
                <q-btn
                  round
                  flat
                  :to="{ name: 'shopping-cart', params: { id: 1 } }"
                >
                  <q-badge color="red" text-color="white" floating> 5 </q-badge>
                  <q-icon name="shopping_cart" />
                </q-btn>
                <q-btn round flat>
                  <q-avatar size="26px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <messages></messages>
                      <q-card class="text-center no-shadow no-border">
                        <q-btn
                          label="Minhas Compras"
                          style="max-width: 180px !important"
                          flat
                          dense
                          class="text-indigo-8 q-pa-sm"
                        >
                        </q-btn>
                      </q-card>
                      <q-card class="text-center no-shadow no-border">
                        <q-btn
                          label="Sair"
                          style="max-width: 180px !important"
                          flat
                          dense
                          class="text-indigo-8 q-pa-sm"
                          @click="logout()"
                        >
                        </q-btn>
                      </q-card>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
              <div v-if="!userStore.loggedIn">
                <q-btn :to="{ name: 'login' }">Entre</q-btn>
                <q-btn :to="{ name: 'registration' }">Cadastre-se</q-btn>
              </div>
            </div>
          </q-toolbar>
        </div>
      </div>

      <ListCategory />
    </q-header>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts"></script>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

import type { UserLoginInterface } from "@/entities/user";

const router = useRouter();

const userStore = useUserStore();

const user = ref<UserLoginInterface>({
  email: "",
  password: "",
});

const register = () => {
  userStore
    .register(user.value.email, user.value.password)
    .then(() => {
      router.push({
        name: "home",
      });
    })
    .catch(() => {});
};
</script>

<template>
  <div id="q-app">
    <q-layout view="lHh Lpr fff">
      <q-page
        class="window-height window-width row justify-center items-center"
        style="background: whitesmoke"
      >
        <div class="column q-pa-lg">
          <div class="row">
            <q-card
              square
              class="shadow-24"
              style="width: 400px; height: 500px"
            >
              <q-card-section class="bg-teal-6">
                <h4 class="text-h5 text-white q-my-md">Store Book</h4>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-md">
                  <q-input
                    ref="userName"
                    square
                    clearable
                    v-model="userStore.user.userName"
                    type="text"
                    lazy-rules
                    :rules="[]"
                    label="Nome"
                  >
                    <template v-slot:prepend>
                      <q-icon name="account_circle" />
                    </template>
                  </q-input>
                  <q-input
                    ref="fullName"
                    square
                    clearable
                    v-model="userStore.user.fullName"
                    type="text"
                    lazy-rules
                    :rules="[]"
                    label="Nome Completo"
                  >
                    <template v-slot:prepend>
                      <q-icon name="assignment_ind" />
                    </template>
                  </q-input>
                  <q-input
                    ref="email"
                    square
                    clearable
                    v-model="user.email"
                    type="email"
                    lazy-rules
                    :rules="[]"
                    label="Email"
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>

                  <q-input
                    ref="password"
                    square
                    clearable
                    v-model="user.password"
                    type="password"
                    lazy-rules
                    :rules="[]"
                    label="Senha"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>

              <q-card-actions class="q-px-lg q-ma-lg">
                <q-btn
                  unelevated
                  size="lg"
                  color="secondary"
                  @click="register()"
                  class="full-width text-white"
                  label="Cadatrar-se"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-layout>
  </div>
</template>

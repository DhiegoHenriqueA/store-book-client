<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import type { UserLoginInterface } from "@/entities/user";

const userStore = useUserStore();

const user = ref<UserLoginInterface>({
  email: "",
  password: "",
});

const login = () => {
  userStore.login();
};
</script>

<template>
  email? {{ user.email }} loggedIn: {{ userStore.loggedIn }}

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
              style="width: 400px; height: 440px"
            >
              <q-card-section class="bg-teal-6">
                <h4 class="text-h5 text-white q-my-md">Store Book</h4>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-xl">
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
                    <template v-slot:append>
                      <q-icon
                        :name="visibilityIcon"
                        @click="switchVisibility"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>

              <q-card-actions class="q-px-lg">
                <q-btn
                  unelevated
                  size="lg"
                  color="secondary"
                  @click="login"
                  class="full-width text-white"
                  label="Entrar"
                />
              </q-card-actions>
              <q-card-section class="text-center q-pa-sm">
                <p class="text-grey-6">Esqueceu a senha?</p>
                <p class="text-grey-6">Cadastre-se?</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-layout>
  </div>
</template>

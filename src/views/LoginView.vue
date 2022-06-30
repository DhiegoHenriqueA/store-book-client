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
  <div class="box">
    <div>
      <h4>Login</h4>
      <input type="text" v-model="user.email" />
      <input type="password" v-model="user.password" />
      <button @click="login">Login</button>
      <q-btn color="primary" icon="mail" label="On Left" />
    </div>
    <hr />
    email? {{ user.email }}
    <hr />
    loggedIn: {{ userStore.loggedIn }}
  </div>
</template>

<style scoped>
.box {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box div {
  box-shadow: 8px 6px 6px darkgray;
  width: 480px;
  height: 320px;
  position: absolute;
  top: 0;
  bottom: 100px;
  left: 0;
  right: 0;
  margin: auto;
  background-color: whitesmoke;
}
</style>

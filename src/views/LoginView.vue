<script lang="ts" setup>
import { ref } from "vue";
interface UserLoginInterface {
  email: string;
  password: string;
}

const user = ref<UserLoginInterface>({
  email: "",
  password: "",
});

const login = () => {
  alert(user.value.email);
};
</script>

<template>
  <div class="box">
    <div>
      <h1>Login</h1>
      <input type="text" v-model="user.email" />
      <input type="password" v-model="user.password" />
      <button @click="login">Login</button>
    </div>
    <hr />
    email? {{ user.email }}
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

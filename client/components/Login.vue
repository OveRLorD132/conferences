<template>
  <div :class="{'cont': true, 'register-cont': overlayType === OverlayType.Registration}">
    <img class="cross" :src="closeUrl" @click="closeDialog()"/>
    <div class="header" style="font-weight: bold; font-size: 22px;">{{overlayType === OverlayType.Login ? 'Login' : 'Registration'}}</div>
    <div class="main">{{overlayType === OverlayType.Login ? 'Don\'t have an account?' : 'Already have an account?'}}
      <div class="link" @click="swapOverlay()">{{overlayType === OverlayType.Login ? 'Register' : 'Login'}}</div>
    </div>

    <div class="inputs">
      <form @submit.prevent="endInput()">
        <template v-if="overlayType === OverlayType.Registration">
          <div class="input">
            <div class="header">Username</div>
            <input class="txt" v-model="username" placeholder="Username" type="text" />
          </div>
        </template>
        <div class="input">
          <div class="header">Email</div>
          <input class="txt" v-model="email" placeholder="Email" type="text" />
        </div>
        <div class="input">
          <div class="header">Password</div>
          <input class="txt" v-model="password" placeholder="Password" type="password" />

        </div>
        <input class="btn" type="submit" :value="overlayType === OverlayType.Login ? 'Login' : 'Create account'"/>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type {global} from "../../global";
  type Login = global.Login;
  type Register = global.Register;

  const closeUrl = new URL('../img/main/close.svg', import.meta.url).href;

  import {OverlayType} from "../types/enum";
  import {ref} from "vue";



  const emits = defineEmits<{
    (e: 'close'): void
    (e: 'login', login: Login): void
    (e: 'registration', registration: Register): void
  }>();

  const overlayType = ref<OverlayType>(OverlayType.Login);

  const username = ref<string>();
  const email = ref<string>();
  const password = ref<string>();

  function closeDialog(): void {
    emits('close');
  }
  function swapOverlay() {
    if(overlayType.value === OverlayType.Login) return overlayType.value = OverlayType.Registration;
    return overlayType.value = OverlayType.Login;
  }
  function endInput(): void {
    if(!email.value || !password.value) return;
    if(overlayType.value === OverlayType.Login) emits('login', {
      email: email.value,
      password: password.value
    });
    else if(username.value) emits('registration', {
      username: username.value,
      email: email.value,
      password: password.value
    })
  }
</script>


<style scoped lang="scss">
@import "../styles.scss";

.cont {
  position: relative;
  font-size: 15px;
  background-color: #fff;
  border-radius: 20px;
  padding: 40px 35px 40px 35px;
  color: $main-text;
}

.cont .main {
  display: flex;
  flex-direction: row;
  column-gap: 5px;
  margin-top: 10px;
  font-weight: 600;
}

.link {
  color: $main-blue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}

.inputs {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  .header {
    color: $text-light;
    font-size: 16px;
  }
}

.btn {
  background-color: $main-blue;
  color: #fff;
  padding: 15px 35px 15px 35px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  border-radius: 10px;
  margin-top: 10px;
  width: 254px;
  outline: none;
  border: none;
  &:hover {
    background-color: $main-blue-hover;
  }
}

.register-cont {
  .txt {
    width: 400px;
  }
  .btn {
    width: max-content;
  }
}
</style>
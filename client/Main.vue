<template>
  <div class="main">
    <div class="menu">
      <div class="top">
        <div class="logo btn-link">
          <RouterLink to="/">
            <img alt="conf." class="logo" :src="logoUrl"/>
          </RouterLink>
        </div>
      </div>
      <div class="middle">
        <RouterLink style="display: flex; align-items: center" to="/">
          <div class="img-cont" :class="{'active': route.path === '/'}">
            <img alt="home" class="btn" :src="route.path === '/'
            ? homeActive
            : homeUrl"/>
          </div>
        </RouterLink>
        <RouterLink style="display: flex; align-items: center" to="/calls">
          <div class="img-cont" :class="{'active': /calls/.test(route.path)}">
            <img alt="calls" class="btn"
                 :src="/calls/.test(route.path)
             ? videoUrl
             : callUrl"
            />
          </div>
        </RouterLink>
        <div class="img-cont">
          <img alt="settings" class="btn" :src="settingsUrl"/>
        </div>

      </div>
      <div class="bottom">
        <template v-if="user">
          <img alt="avt" class="avtr" :src="avatarUrl" />
          <img alt="logout" class="logout" :src="logoutUrl" @click="logoutHandle()" />
        </template>
        <template v-else>
          <img alt="avt" class="avtr" :src="avatarUrl" />
          <img alt="login" class="login" :src="loginUrl" @click="showLogin()" />
        </template>
      </div>
    </div>
    <div class="content">
      <template v-if="isLogged">
        <router-view :user="user" @login="showLogin">

        </router-view>
      </template>
    </div>
    <div id="overlay"></div>
    <template v-if="loginVisibility === Visibility.Visible">
      <Teleport to="#overlay">
        <div class="overlay-cont">
          <Login @close="hideOverlay()" @login="loginUser" @registration="registration"/>
        </div>
      </Teleport>
    </template>
    <template v-if="logoutVisibility === Visibility.Visible">
      <Teleport to="#overlay">
        <div class="overlay-cont">
          <div class="logout-cont">
            <div class="message">
              Are you sure you want to sign out?
            </div>
            <div class="buttons">
              <div class="btn sign-out" @click="logoutConfirm">Sign Out</div>
              <div class="btn close" @click="logoutHandle">Close</div>
            </div>
          </div>
        </div>
      </Teleport>
    </template>
  </div>
</template>

<script setup lang="ts">

const logoUrl = new URL("img/main/logo.png", import.meta.url).href;
const homeUrl = new URL("img/main/home.svg", import.meta.url).href;
const homeActive = new URL("img/main/home.png", import.meta.url).href;
const callUrl = new URL("img/main/video.png", import.meta.url).href;
const videoUrl = new URL("img/main/video-act.png", import.meta.url).href;
const settingsUrl = new URL("img/main/settings.svg", import.meta.url).href;
const avatarUrl = new URL("img/main/avatar.svg", import.meta.url).href;
const logoutUrl = new URL("img/main/signout.png", import.meta.url).href;
const loginUrl = new URL("img/main/login.png", import.meta.url).href;


import type {global} from "../global";
type Profile = global.Profile;
type Login = global.Login;
import {onMounted, ref} from "vue";
  import API from "./module/API";
type Tokens = global.Tokens;
import {Visibility} from "./types/enum";
  import Login from "./components/Login.vue";
  import {useRoute, useRouter} from "vue-router";
import {IMainApplication, IUser} from "./types/interfaces";
  import MainApplication from "./module/MainApplication";
type Register = global.Register;

const router = useRouter();
const route = useRoute();
const user = ref<IUser>();
const token = ref<string>();

const isLogged = ref<boolean>(false);

const application = ref<IMainApplication>();

  onMounted(() => {
    application.value = new MainApplication();


    application.value.login().then(() => {
      user.value = application.value!.user;
      isLogged.value = true;
    })
  })


  const loginVisibility = ref<Visibility>(Visibility.Hidden);

  const logoutVisibility = ref<Visibility>(Visibility.Hidden);

  function logoutHandle(): void {
    if(logoutVisibility.value === Visibility.Hidden) logoutVisibility.value = Visibility.Visible;
    else logoutVisibility.value = Visibility.Hidden;
  }


  function logoutConfirm() {
    logoutHandle();
    logout();
  }

  function logout(): void {
    delete user.value;
    localStorage.removeItem('conf_tokens');

    user.value = undefined;
    application.value?.api.logout();
  }

  function showLogin() {
    loginVisibility.value = Visibility.Visible;
  }
  function hideOverlay() {
    loginVisibility.value = Visibility.Hidden;
  }
  async function loginUser(login: Login): Promise<void> {
    if(!application.value) return;

    const tokens: Tokens = await application.value.api.login(login);
    await authenticate(tokens);

  }
  async function registration(profile: Register): Promise<void> {
    if(!application.value) return;

    const tokens: Tokens = await application.value.api.register(profile);
    await authenticate(tokens);
  }

  async function authenticate(tokens: Tokens): Promise<void> {
    localStorage.setItem('conf_tokens', JSON.stringify(tokens));
    if(!application.value) return;

    user.value = await application.value.api.getUser();
    hideOverlay();
  }
</script>

<style lang="scss" scoped src="./Main.scss">

</style>

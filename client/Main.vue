<template>
  <div class="main">
    <div class="menu">
      <div class="top">
        <div class="logo btn-link">
          <img alt="conf." class="logo" :src="logoUrl"/>
        </div>
      </div>
      <div class="middle">
        <RouterLink style="display: flex; align-items: center" to="/">
          <div class="img-cont" :class="{'active': route.path === '/'}">
            <img alt="home" class="btn" :src="homeUrl"/>
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
          <img alt="logout" class="logout" :src="logoutUrl" @click="logout()" />
        </template>
        <template v-else>
          <img alt="avt" class="avtr" :src="avatarUrl" />
          <img alt="login" class="login" :src="loginUrl" @click="showLogin()" />
        </template>
      </div>
    </div>
    <div class="content">
      <router-view>

      </router-view>
    </div>
    <template v-if="loginVisibility === Visibility.Visible">
      <div class="overlay-cont">
        <Login @close="hideOverlay()" @login="loginUser" @registration="registration"/>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import Conferences from "./components/Conferences.vue";

  const logoUrl = new URL("img/main/logo.png", import.meta.url).href;
  const homeUrl = new URL("img/main/home.svg", import.meta.url).href;
  const callUrl = new URL("img/main/video.png", import.meta.url).href;
  const videoUrl = new URL("img/main/video-act.png", import.meta.url).href;
  const settingsUrl = new URL("img/main/settings.svg", import.meta.url).href;
  const avatarUrl = new URL("img/main/avatar.svg", import.meta.url).href;
  const logoutUrl = new URL("img/main/logout.png", import.meta.url).href;
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
  type Register = global.Register;

  const router = useRouter();
  const route = useRoute();

  let user = ref<Profile>();

  onMounted(() => {
    getUser();
  })

  async function getUser(): Promise<void> {
    const stored = localStorage.getItem('conf_tokens');
    if(!stored) return;

    try {
      const tokens: Tokens = JSON.parse(stored);
      API.getUser(tokens.access_token).then((profile) => {
        user.value = profile;
      }).catch(error => {
        localStorage.removeItem('conf_tokens');
      })

    } catch(err) {
      localStorage.removeItem('conf_tokens');
    }
  }

  const loginVisibility = ref<Visibility>(Visibility.Hidden);

  function logout(): void {
    delete user.value;
    localStorage.removeItem('conf_tokens');
  }

  function showLogin() {
    loginVisibility.value = Visibility.Visible;
  }
  function hideOverlay() {
    loginVisibility.value = Visibility.Hidden;
  }
  async function loginUser(login: Login): Promise<void> {
    const tokens: Tokens = await API.login(login);
    await authenticate(tokens);
  }
  async function registration(profile: Register): Promise<void> {
    const tokens: Tokens = await API.register(profile);
    await authenticate(tokens);
  }

  async function authenticate(tokens: Tokens): Promise<void> {
    localStorage.setItem('conf_tokens', JSON.stringify(tokens));

    user.value = await API.getUser(tokens.access_token);
    hideOverlay();
  }
</script>

<style lang="scss" scoped>
@import './styles.scss';

body {
  font-family: 'Proxima-Nova', sans-serif;
  margin: 0;
}

.btn-link {
  text-decoration: none;
  cursor: pointer;
}

@font-face {
  font-family: 'Proxima-Nova';
  src: url('reg.ttf') format('truetype');
}

@font-face {
  font-family: 'Roboto';
  src: url('roboto.ttf') format('truetype');
}

.overlay-cont {
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(129, 129, 129, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cross {
  width: 18px;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}

.input {
  padding: 10px 0 10px 0;
  .header {
    color: $text-light;
    font-size: 16px;
  }
  .txt {
    margin-top: 10px;
    color: $main-text;
    outline: none;
    border: 2px solid $grey-med;
    border-radius: 10px;
    padding: 10px;
    font-size: 15px;
    width: 230px;
    &::placeholder {
      color: $text-light;
    }
  }
}


.main {
  color: #131325;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  .menu {
    background-color: #fff;
    width: 95px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 5px 20px 5px;
    border-right: $grey-med 1px solid;
    .top {
      display: flex;
      align-items: center;
      justify-content: center;
      .logo {
        display: flex;
        flex-direction: row;
        font-size: 29px;
        font-weight: bold;
      }
      .pnt {
        color: $main-blue;
        font-size: 60px;
        margin-top: -29px;
        margin-left: -3px;
      }
    }
    .middle {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 25px;
    }
    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 25px;
      padding: 10px 0 10px 0;
    }
  }
  .content {
    width: 100%;
    position: relative;
    padding: 40px 20px 40px 40px;
  }
}

.avtr {
  width: 25px;
  cursor: pointer;
  background-color: #dcdcdc;
  border-radius: 50%;
  padding: 6px;
}
.logout {
  cursor: pointer;
  width: 32px;
}

.login {
  width: 32px;
  cursor: pointer;
}

.logo {
  height: 22px;
}

.img-cont {
  padding: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  cursor: pointer;
  &.active {
    background-color: $hover-blue;
  }
  &:hover {
    background-color: $hover-blue;
  }
  .btn {
    width: 24px;
  }
}

</style>

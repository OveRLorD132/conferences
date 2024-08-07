<template>
  <div class="error">
    <div class="content">
      <div class="code">{{code}}</div>
      <div class="message">{{message}}</div>
      <div class="info">
        <template v-if="code === 401">
          <div style="display: flex; flex-direction: row; column-gap: 3px; text-align: center; justify-content: center;">
            To get access please
            <div class="btn" @click="emitLogin">login</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  code: number
}>();

const emits = defineEmits<{
  (e: 'login'): void;
}>();

const enum Errors {
  Auth = 'Unauthorized',
  NotFound = 'Not Found',
  Forbidden = 'Forbidden',
  ServerError = 'Internal Server Error',
}

const message = ref<string>();

switch (props.code) {
  case 401:
    message.value = Errors.Auth
    break;
  case 403:
    message.value = Errors.Forbidden
    break;
  case 404:
    message.value = Errors.NotFound;
    break
  case 500:
    message.value = Errors.ServerError;
    break;
  default:
    break;

}

function emitLogin() {
  emits('login');
}

</script>

<style scoped lang="scss" src="./Error.scss">

</style>
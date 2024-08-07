<template>
  <title>Conferences</title>
  <template v-if="!user">
    <Error @login="emitLogin" :code="401"/>
  </template>
  <template v-else>
    <div style="height: 100%">
      <h1 class="header">Conferences
        <div class="create-btn" @click="showOverlay()">
          <img class="plus" alt="add" :src="plusUrl"/>
          New Call
        </div>
      </h1>
      <template v-if="overlay === Visibility.Visible">
        <div class="overlay-cont">
          <div class="cont">
            <img class="cross" @click="hideOverlay()" :src="closeUrl" />
            <h1 style="margin-top: 0">Create Conference</h1>
            <div class="call-form">
              <form @submit.prevent="createCall">
                <div class="input">
                  <div class="header">Name</div>
                  <input class="txt" v-model="name" type="text" placeholder="Name" />
                </div>
                <div class="input">
                  <div class="header">Description</div>
                  <textarea placeholder="Description" v-model="description" style="font-size: 16px;
                font-family: 'Proxima-Nova', 'sans-serif';
                height: 100px; resize: vertical; max-height: 200px" class="txt"></textarea>
                </div>
                <div class="input">
                  <div class="header">Type</div>
                </div>
                <div class="select">
                  <div class="option" :class="{ 'option-selected': confType === ConferenceType.Public }"
                       @click="setOption(ConferenceType.Public)">
                    <div class="round">
                      <div class="round-active"></div>
                    </div>
                    <div class="text">Public</div>
                  </div>
                  <div class="option" :class="{ 'option-selected': confType === ConferenceType.Private }"
                       @click="setOption(ConferenceType.Private)">
                    <div class="round">
                      <div class="round-active"></div>
                    </div>
                    <div class="text">Private</div>
                  </div>
                </div>
                <input class="submit" type="submit" value="Create"/>
              </form>
            </div>
          </div>
        </div>
      </template>
      <div class="conferences">
        <template v-if="conferencesList.length === 0">
          <div class="label">You don't have any conference</div>
        </template>
        <template v-if="conferencesList.length > 0">
          <div class="list-cont">
            <template v-for="(conference, index) in conferencesList" :key="index">
              <Conference :conference="conference"
                          @edit="(conf: CallRaw) => openDialog(Dialog.Edit, conf)"
                          @delete="(conf: CallRaw) => openDialog(Dialog.Delete, conf)"
              />
            </template>
          </div>
        </template>
      </div>
    </div>
  </template>
  <template v-if="dialog">
    <Teleport to="#overlay">
      <div class="overlay-cont">
        <ConferenceDialog :type="dialog"/>
      </div>
    </Teleport>
  </template>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";
import {CallRaw} from "../../../server/module/types";

const props = defineProps<{
  user?: IUser
}>();

const emits = defineEmits<{
  (e: 'login'): void
}>();

import {ConferenceType, Dialog, Visibility} from "../../types/enum";
import Conference from "./components/Conference.vue";
import type {IConferences, IUser} from "../../types/interfaces";
import Error from "../Error/Error.vue";
import Conferences from "./Conferences";
import ConferenceDialog from "./components/ConferenceDialog.vue";

const closeUrl = new URL("../../img/main/close.svg", import.meta.url).href;
const plusUrl = new URL("../../img/main/plus.svg", import.meta.url).href;

const application: IConferences = new Conferences();
const conferencesList = ref<CallRaw[]>([]);

if(props.user) {
  application.setUser(props.user);
  application.api.getCalls().then((calls) => {
    conferencesList.value = calls;
  })
}

watch(props, (newValue) => {
  if(newValue.user) {
    application.setUser(newValue.user);
    application.api.getCalls().then((calls) => {
      conferencesList.value = calls;
    })
  }
})

const name = ref<string>('');
const description = ref<string>('');

const overlay = ref<Visibility>(Visibility.Hidden);

function showOverlay() {
  overlay.value = Visibility.Visible;
}
function hideOverlay() {
  overlay.value = Visibility.Hidden;
}

const confType = ref<ConferenceType>(ConferenceType.Public);

function setOption(option: ConferenceType) {
  confType.value = option;
}

function createCall(): void {
  if(!props.user) return;

  application.addCall({
    user_id: props.user.info.id.toString(),
    name: name.value,
    description: description.value,
    visibility: confType.value
  }).then((call) => {
    conferencesList.value.push(call);
  }).finally(() => {
    hideOverlay();
  })
}

function emitLogin() {
  emits('login');
}

const dialog = ref<Dialog>();
const confSelected = ref<CallRaw>();

function openDialog(dialogType: Dialog, conference: CallRaw): void {
  dialog.value = dialogType;
  confSelected.value = conference;
}

function hideDialog() {
  dialog.value = undefined;
  confSelected.value = undefined;
}
</script>

<style scoped lang="scss" src="./Conferences.scss">
</style>
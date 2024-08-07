<template>
  <div class="conf">
    <div class="color" :style="{ backgroundColor: conference.visibility === 'private' ? '#db2777' : '#16a34a' }"></div>
    <div class="content">
      <RouterLink class="link" :to="`/calls/${conference.id}`">
        <div class="name">{{conference.name}}</div>
      </RouterLink>

      <div class="info">
        <div class="user">
          <img alt="avatar" :src="avatarSrc" class="avatar">
          <div class="username">Username</div>
        </div>
        <div class="point-cont">
          <div class="point"></div>
        </div>
        <div class="time">
          <img alt="clock" class="clock" :src="clockSrc" />
          10:00
        </div>
        <div class="point-cont">
          <div class="point"></div>
        </div>
        <div class="visibility">
          <div class="lbl">{{conference.visibility === 'public' ? 'Public' : 'Private'}}</div>
        </div>
      </div>
      <div class="visibility"></div>
    </div>
    <div class="buttons">
      <img class="button edit" alt="edit" :src="editSrc" @click="editConf"/>
      <img class="button delete" alt="delete" :src="deleteSrc" @click="deleteConf"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {CallRaw} from "../../../../server/module/types";

const avatarSrc = new URL("../../../img/main/avatar.svg", import.meta.url).href;
const clockSrc = new URL("../../../img/main/clock.svg", import.meta.url).href;
const editSrc = new URL("../../../img/main/edit.png", import.meta.url).href;
const deleteSrc = new URL("../../../img/main/delete.svg", import.meta.url).href;

const props = defineProps<{
  conference: CallRaw
}>();

const emits =  defineEmits<{
  edit: [CallRaw]
  delete: [CallRaw]
}>();

function editConf() {
  emits('edit', props.conference);
}

function deleteConf() {
  emits('delete', props.conference);
}
</script>


<style scoped lang="scss" src="./Conference.scss">
</style>
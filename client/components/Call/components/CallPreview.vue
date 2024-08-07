<template>
  <div class="cont">
    <div class="preview">
      <div class="container">
        <div class="left">
          <div class="member">
            <template v-if="camera">
              <video class="video" :srcObject="localStream" muted autoplay />
            </template>
            <template v-else>
              <div class="avatar">
                <img class="avatar-img" :src="avatarUrl" alt="avatar" />
              </div>
            </template>
            <div class="line">
              <div class="left">
                <div class="line-btn micro" @click="switchMicrophone">
                  <img class="micro" alt="micro"
                       :src="micro ? microUrl : microInactiveUrl"
                  />
                </div>
                <div class="line-btn cam"
                     :style="{backgroundColor: camera ? '#4c40f4' : '#ed6a5e'}"
                     @click="switchCamera"
                >
                  <img class="cam"
                       :style="{backgroundColor: camera ? '#4c40f4' : '#ed6a5e'}"
                       alt="cam" :src="camera ? camUrl : inactUrl "
                  />
                </div>
              </div>
              <div class="line-btn more">
                <img class="more" alt="more" :src="moreUrl"/>
              </div>
            </div>
          </div>
        </div>
        <div class="info">
          <div class="top">
            <h2 style="margin-bottom: 0">You are trying to join call {{info.name}}</h2>
            <h3 style="margin: 0">About:</h3>
            <div class="description">{{info.description}}</div>
            <div class="time">This call starts at 10:00</div>
          </div>
          <div class="bottom">
            <div class="buttons">
              <div class="blue btn" @click="startCall()">Join</div>
              <a class="red btn" href="/">Close</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const microUrl = new URL("../../../img/main/micro-2.png", import.meta.url).href;
const microInactiveUrl = new URL("../../../img/main/micro-inactive.png", import.meta.url).href;
const camUrl = new URL("../../../img/main/video-white.png", import.meta.url).href;
const inactUrl = new URL("../../../img/main/video-inact.png", import.meta.url).href;
const avatarUrl = new URL("../../../img/main/avatar.svg", import.meta.url).href;
const moreUrl = new URL("../../../img/main/more.png", import.meta.url).href;

import {onMounted, ref, watch} from 'vue';
import {CallRaw, Media} from "../../../../server/module/types";

const props = defineProps<{
  info: CallRaw
}>();

const emits = defineEmits<{
  join: [Media, MediaStream]
}>()

const localStream = ref<MediaStream>();
const camera = ref<boolean>(true);
const micro = ref<boolean>(true);

navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then((stream: MediaStream) => {
      localStream.value = stream;
    })

function switchCamera() {
  camera.value = !camera.value;
  const tracks = localStream.value?.getVideoTracks();
  if(!tracks && !camera.value) return;
  else {
    if(!camera.value && tracks) {
      tracks.forEach((track) => {
        track.stop();
        localStream.value?.removeTrack(track);
      });
    } else {
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
          .then((stream: MediaStream) => {
            const tracks = stream.getVideoTracks();
            tracks.forEach((track) => {
              localStream.value?.addTrack(track);
            })
          })
    }
  }
}

function switchMicrophone() {
  micro.value = !micro.value;
  const tracks = localStream.value?.getAudioTracks();
  if(!tracks && !micro.value) return;
  else {
    if(!micro.value && tracks) {
      tracks.forEach((track) => {
        track.stop();
        localStream.value?.removeTrack(track);
      });
    } else {
        navigator.mediaDevices.getUserMedia({video: false, audio: true})
            .then((stream: MediaStream) => {
              const tracks = stream.getAudioTracks();
              tracks.forEach((track) => {
                localStream.value?.addTrack(track);
              })
            })
    }
  }
}

function startCall() {
  if(!localStream.value) return;

  emits('join', {
    cam: camera.value,
    micro: micro.value
  }, localStream.value)
}
</script>

<style scoped lang="scss" src="./Preview.scss">
</style>
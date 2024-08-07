<template>
  <title>{{callApp ? callApp.call.info.name : "Join Call"}}</title>
  <template v-if="!isEntered && callApp">
    <CallPreview :info="callApp.call.info" @join="startCall"/>
  </template>
  <template v-if="isEntered && callApp">
    <div class="call">
      <div class="member">
        <video id="video" class="video" :srcObject="localStream" autoplay />
      </div>
      <template v-for="stream in streams">
        <div class="member">
          <video class="video" :srcObject="stream" autoplay />
        </div>
      </template>
    </div>
    <div class="line">
      <div class="buttons">
        <div class="btn">Mute</div>
        <div class="btn">Camera</div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import {io, Socket} from "socket.io-client";
import {CallUser, Media} from "../../../server/module/types";
import CallPreview from "./components/CallPreview.vue";
import {onMounted, ref} from "vue";
import {Connection} from "../../types/main";
import {ICallApplication, IMainApplication, IUser} from "../../types/interfaces";
import CallApplication from "./CallApplication";

const props = defineProps<{
  user: IUser,
  id: string
}>();

const emits = defineEmits<{
  (e: 'login'): void
}>();

const isEntered = ref<boolean>(false);

let callApp = ref<ICallApplication>();

CallApplication.create(props.id).then((call) => {
  callApp.value = call;
})

const localStream = ref<MediaStream>();
const streams = ref<MediaStream[]>([]);

const _connections: Connection[] = [];
const _socket: Socket = io('http://localhost:3000');

let _user_id: string = '2';

_establishSocketEvents(_socket);

const camera = ref<boolean>(false);

function camSwitch() {
  camera.value = !camera.value;
}

const micro = ref<boolean>(false);

function microSwitch() {
  micro.value = !micro.value;
}

function startCall(media: Media, stream: MediaStream) {
  localStream.value = stream;
  camera.value = media.cam;
  micro.value = media.micro;
  _socket.emit('call-enter', { call_id: props.id });
}

function _establishSocketEvents(socket: Socket): void {
  socket.on('enter-result', async ({ id, users }: {id: string, users: CallUser[]}) => {
    _user_id = id;

    for(let user of users) {
      if(user.id !== id) await _sendOffer(user.socket_id, user.id)
    }
    isEntered.value = true;
  })
  socket.on('offer', async ({ offer, sender_id }) => {
    const connection = _createConnection();
    _connections.push({
      user_id: sender_id,
      connection
    })

    await connection.setRemoteDescription(offer);
    await _sendAnswer(connection, offer);
  })

  socket.on('answer', async ({ answer, sender_id, offer }) => {
    const connection = _getBySender(sender_id);

    await connection!.setRemoteDescription(answer);
  })

  socket.on('ice-candidate', async ({ candidate, sender_id }) => {
    const connection = _getBySender(sender_id);

    for(let conn of _connections) {
      await conn.connection.addIceCandidate(candidate);
    }
  })
}

async function _sendOffer(socket_id: string, user_id: string): Promise<void> {
  const connection = _createConnection();
  const offer = await connection.createOffer();
  _connections.push({
    connection,
    user_id
  })

  await connection.setLocalDescription(offer);

  _socket.emit('offer', {
    offer,
    socket_id,
    sender_id: _user_id
  })
}

async function _sendAnswer(connection: RTCPeerConnection, offer: RTCSessionDescriptionInit): Promise<void> {
  const answer = await connection.createAnswer();
  _socket.emit('answer', { answer, call_id: props.id, sender_id: _user_id, offer });

  await connection.setLocalDescription(answer);
}

function _createConnection(): RTCPeerConnection {
  const connection = new RTCPeerConnection();
  connection.onicecandidate = (event) => {
    if(event.candidate) {
      _socket.emit('ice-candidate', {
        candidate: event.candidate,
        call_id: props.id,
        sender_id: _user_id
      });
    }
  }

  connection.ontrack = (event) => { streams.value.push(event.streams[0]);}
  localStream.value!.getTracks().forEach((track) => connection.addTrack(track, localStream.value!));

  return connection;
}

function _getBySender(id: string): RTCPeerConnection | undefined {
  for(let connection of _connections) {
    if(connection.user_id === id) return connection.connection;
  }
  return;
}

</script>



<style scoped lang="scss" src="./Call.scss">

</style>
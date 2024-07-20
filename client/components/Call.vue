<template>
  <div @click="startCall()">Start</div>
  <video id="video" :srcObject="localStream" style="width: 300px; height: 300px" autoplay></video>
  <div v-for="stream in streams">
    <video :srcObject="stream" style="width: 300px; height: 300px" autoplay></video>
  </div>
</template>

<script setup lang="ts">
import {io, Socket} from "socket.io-client";
import {CallUser} from "../../server/module/types";
import {ref} from "vue";
import {Connection} from "../types/main";

const localStream = ref<MediaStream>();
const streams = ref<MediaStream[]>([]);

const call_id: string = '7';

const _connections: Connection[] = [];
const _socket: Socket = io('http://localhost:3000');

let _user_id: string = '2';


function startCall() {
  _establishSocketEvents(_socket);

  navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(async (stream) => {
    localStream.value = stream;

    _socket.emit('call-enter', { call_id });
  })
}

function _establishSocketEvents(socket: Socket): void {
  socket.on('enter-result', async ({ id, users }: {id: string, users: CallUser[]}) => {
    _user_id = id;

    for(let user of users) {
      if(user.id !== id) await _sendOffer(user.socket_id, user.id)
    }
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
  _socket.emit('answer', { answer, call_id, sender_id: _user_id, offer });

  await connection.setLocalDescription(answer);
}

function _createConnection(): RTCPeerConnection {
  const connection = new RTCPeerConnection();
  connection.onicecandidate = (event) => {
    if(event.candidate) {
      _socket.emit('ice-candidate', {
        candidate: event.candidate,
        call_id,
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

function _getByDesc(desc: string): RTCPeerConnection | undefined {
  for(let connection of _connections) {
    if(connection.connection.localDescription?.sdp === desc) return connection.connection;
  }
  return;
}

</script>



<style scoped lang="scss">

</style>
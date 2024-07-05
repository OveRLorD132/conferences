import {Component, Input} from "@angular/core";
import {Connection} from "../types/main";
import {io, Socket} from "socket.io-client";
import {CallUser} from "../../../server/module/types";
@Component({
  selector: "call-component",
  templateUrl: "./call.component.html",
  styleUrls: ["./call.component.scss"]
})
export class CallComponent {
  @Input({ required: true }) call_id: string;

  public localStream?: MediaStream;
  public streams: MediaStream[] = [];
  private _connections: Connection[] = [];
  private _socket: Socket = io('http://localhost:3000');

  private _user_id?: string;


  public startCall() {
    this._establishSocketEvents(this._socket);

    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(async (stream) => {
      this.localStream = stream;

      this._socket.emit('call-enter', { call_id: this.call_id });
    })
  }

  private _establishSocketEvents(socket: Socket): void {
    socket.on('enter-result', async ({ id, users }: {id: string, users: CallUser[]}) => {
      this._user_id = id;

      for(let user of users) {
        if(user.id !== id) await this._sendOffer(user.socket_id, user.id)
      }
    })
    socket.on('offer', async ({ offer, sender_id }) => {
      console.log('offer');
      const connection = this._createConnection();
      this._connections.push({
        user_id: sender_id,
        connection
      })

      await connection.setRemoteDescription(offer);
      await this._sendAnswer(connection, offer);
    })

    socket.on('answer', async ({ answer, sender_id, offer }) => {
      console.log('answer');
      console.log(sender_id);
      console.log(this._connections);
      const connection = this._getBySender(sender_id);

      await connection!.setRemoteDescription(answer);
      console.log('answer');
    })

    socket.on('ice-candidate', async ({ candidate, sender_id }) => {
      const connection = this._getBySender(sender_id);
      console.log(sender_id);
      console.log(this._connections);

      for(let conn of this._connections) {
        await conn.connection.addIceCandidate(candidate);
      }

    })
  }

  private async _sendOffer(socket_id: string, user_id: string): Promise<void> {
    const connection = this._createConnection();
    const offer = await connection.createOffer();
    this._connections.push({
      connection,
      user_id
    })

    await connection.setLocalDescription(offer);

    this._socket.emit('offer', {
      offer,
      socket_id,
      sender_id: this._user_id
    })
  }

  private async _sendAnswer(connection: RTCPeerConnection, offer: RTCSessionDescriptionInit): Promise<void> {
    const answer = await connection.createAnswer();
    this._socket.emit('answer', { answer, call_id: this.call_id, sender_id: this._user_id, offer });

    await connection.setLocalDescription(answer);
  }


  private _createConnection(): RTCPeerConnection {
    const connection = new RTCPeerConnection();
    connection.onicecandidate = (event) => {
      if(event.candidate) {
        this._socket.emit('ice-candidate', {
          candidate: event.candidate,
          call_id: this.call_id,
          sender_id: this._user_id
        });
      }
    }

    connection.ontrack = (event) => { this.streams.push(event.streams[0]);}
    this.localStream!.getTracks().forEach((track) => connection.addTrack(track, this.localStream!));

    return connection;
  }

  private _getBySender(id: string): RTCPeerConnection | undefined {
    for(let connection of this._connections) {
      if(connection.user_id === id) return connection.connection;
    }
    return;
  }

  private _getByDesc(desc: string): RTCPeerConnection | undefined {
    for(let connection of this._connections) {
      if(connection.connection.localDescription?.sdp === desc) return connection.connection;
    }
    return;
  }
}


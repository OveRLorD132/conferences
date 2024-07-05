import {IHttpServer, ISignalServer, WebsocketConfig} from "../../types/server";
import {Server} from 'socket.io';
import {ICalls} from "../../types/db";
import {CallRaw, ICall} from "../../types";
import Call from '../../classes/Call';

export class SocketServer implements ISignalServer {
  private _io: Server;
  private _calls: ICalls;

  private _callsList: ICall[] = [];

  public get server(): Server {
    return this._io;
  }

  constructor(srv: IHttpServer, calls: ICalls) {
    this._io = new Server(srv.http, {
      cors: {
        origin: "http://localhost:4200",
        methods: '*'
      }
    });
    this._calls = calls;
  }

  public run(): void {
    this._io.on('connection', (socket) => {
      socket.on('call-enter', async ({ call_id }) => {
        console.log('enter');
        const callRaw: CallRaw = await this._calls.getCall(call_id);

        let call = this._getCall(callRaw.id);
        if(!call) {
          call = new Call(callRaw);
          this._callsList.push(call);
        }

        const user = call.addUser(socket.id);
        socket.join('Call_' + call.info.id);

        socket.emit('enter-result', {
          id: user.id,
          users: call.users
        });
      })

      socket.on('offer', async ({ offer, socket_id, sender_id }) => {
        socket.to(socket_id).emit('offer', {
          offer,
          sender_id
        });
      })

      socket.on('answer', async ({ answer, call_id, sender_id, offer }) => {
        let call;
        for(let elem of this._callsList) {
          if(elem.info.id === call_id) { call = elem; break; }
        }
        console.log('answer');
        if(!call) return;

        const user = call.getUser(sender_id)
        if(!user) return;

        const socket_id = user.socket_id;

        socket.broadcast.to('Call_' + call_id).emit('answer', {
          answer,
          sender_id,
          offer
        })
      });

      socket.on('ice-candidate', async ({ candidate, call_id, sender_id }) => {
        socket.broadcast.to('Call_' + call_id).emit('ice-candidate', {
          candidate,
          sender_id
        })
      })

      socket.on('disconnect', async () => {
        for(let call of this._callsList) {
          for(let user of call.users) {
            if(user.socket_id === socket.id) { call.users.splice(call.users.indexOf(user), 1); return; }
          }
        }
      })
    })
  }
  public async close(): Promise<void> {

  }

  private _getCall(id: string): ICall | undefined {
    for(let call of this._callsList) {
      if(call.info.id === id) return call;
    }
  }
}
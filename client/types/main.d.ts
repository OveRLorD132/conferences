export type User = {
  id: string,
  name: string
}

export type MessageType = 'ready' | 'offer' | 'answer' | 'ice-candidate';

export type Message = {
  type: MessageType,
  data: object,
  index: number
}

export type Connection = {
  user_id: string,
  connection: RTCPeerConnection
}
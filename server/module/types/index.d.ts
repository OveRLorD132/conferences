export type CallRaw =  {
  id: string,
  user_id: string
}

export interface ICall {
  info: CallRaw
  users: CallUser[]

  addUser(socket_id: string): CallUser,
  getUser(id: string): CallUser | undefined
}

export type CallUser = {
  id: string,
  socket_id: string
}
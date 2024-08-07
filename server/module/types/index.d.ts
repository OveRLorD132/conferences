export type CallRaw =  {
  id: string,
  user_id: string,
  name: string,
  description: string,
  visibility: 'public' | 'private'
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

export type Media = {
  cam: boolean,
  micro: boolean
}
export namespace global {
  export type User = {
    id: number,
    name: string,
    email: string,
    password: string
  }
  export type Login = {
    email: string,
    password: string
  }
  export type Register = {
    username: string,
    email: string,
    password: string
  }
  export type Profile = {
    id: number,
    name: string,
    email: string
  }
  export type Tokens = {
    access_token: string,
    refresh_token: string
  }
}
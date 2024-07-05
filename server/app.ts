import createServer from "./module/core/createServer";
import {SocketServer} from "./module/core/WS/SocketServer";
import createWebsocketConfig from "./module/config/websocketConfig";

createServer().then(() => {
  console.log("Server created successfully");
})
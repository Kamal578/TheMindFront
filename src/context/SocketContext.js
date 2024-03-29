import React from "react";
import io from "socket.io-client";

export const socket = io(process.env.REACT_APP_API_URL,{
  transports: ['websocket', 'polling', 'flashsocket'],
  auth: {
    token: localStorage.getItem('access_token')
  }
});
export const SocketContext = React.createContext(socket);
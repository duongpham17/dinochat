import io from 'socket.io-client';

const url = process.env.NODE_ENV === "production" ? process.env.REACT_APP_PRODUCTION_PORT_API : process.env.REACT_APP_DEVELOPMENT_PORT_API;

const connectionOptions =  {
    reconnectionAttempts: Infinity,
    autoConnect: false,
};

export const socket = io(url || "http://localhost:8000", connectionOptions);

export default socket 
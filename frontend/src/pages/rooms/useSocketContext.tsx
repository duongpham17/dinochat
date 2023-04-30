import React, { useEffect, useState, createContext } from 'react';
import socket from '@socket';
import { IUser } from '@redux/types/users';
import { IRoom } from '@redux/types/rooms';
import { IMessage } from '@redux/types/messages';

interface Props {
    children: React.ReactNode,
    user: IUser,
    room: IRoom,
};

export type RoomDataProps = IRoom | null;

export type MessagesDataProps = IMessage[] | null

export interface PropsTypes {
    user: IUser | null,
    roomData: RoomDataProps,
    messagesData: MessagesDataProps
    onEmitSendMessage: (message: string) => void,
};

// for consuming in children components, initial return state
export const Context = createContext<PropsTypes>({
    user: null,
    roomData: null,
    messagesData: null,
    onEmitSendMessage: () => null
});

export const useSocketContext = ({children, user, room}: Props) => {

    const [roomData, setRoomData] = useState<RoomDataProps>(null);

    const [messagesData, setMessagesData] = useState<MessagesDataProps>(null)

    useEffect(() => {

        socket.connect();
    
        socket.emit("joinRoom", {user, room});
    
        socket.open();

        return () => {
            socket.emit("leaveRoom", {user, room});
      
            socket.disconnect();
        };
    
    }, [room, user]);

    useEffect(() => {

        socket.on("joinedRoom", ({room, messages}: {room: IRoom, messages: IMessage[]}) => {
            setRoomData(room);
            setMessagesData(messages);
        });

        socket.on("leftRoom", ({room}: {room: IRoom}) => {
            setRoomData(room);
        });

        socket.on("sentMessage", ({message}:{message: IMessage} ) => {
            setMessagesData(state => state ? [...state, message] : [message]); 
        });

        // Fires the socket.on once
        return () => {
            socket.off("sentMessage");
            socket.off("joinedRoom");
            socket.off("leftRoom");
        }

    }, []);

    const onEmitSendMessage = (message: string) => {
        if(!roomData) return;
        socket.emit("sendMessage", {
            message: {
                room: roomData._id,
                user_id: user._id,
                name: user.name,
                createdAt: new Date(),
                message
            }
        });
    };

    const value = {
        user,
        roomData,
        messagesData,
        onEmitSendMessage,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default useSocketContext
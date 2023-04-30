/*TYPES**************************************************************************************************************/

export interface IRoomUser {
    _id: string,
    user_id: string,
    name: string,
    online: boolean,
    socket_id: string, 
}

export interface IRoom {
    _id: string,
    admin: string,
    name: string,
    users: IRoomUser[],
    password: string,
    image: string,
    contents: string,
    createdAt: Date,
};

/*STATE**************************************************************************************************************/
export interface ResponseType {
    [key: string]: any
};

export interface INITIALSTATE_ROOMS {
    rooms: IRoom[] | null,
    room: IRoom | null,
    chats: IRoom[] | null,
    status: ResponseType,
    errors: ResponseType
};

export type RoomsObjectKeys = keyof INITIALSTATE_ROOMS

/*ACTION**************************************************************************************************************/

export enum TYPES_ROOMS {
    ROOMS_SEARCH = "ROOMS_SEARCH",
    ROOMS_SELECT = "ROOMS_SELECT",
    ROOMS_CREATE = "ROOMS_CREATE",
    ROOMS_VERIFY = "ROOMS_VERIFY",
    ROOMS_CHATS  = "ROOMS_CHATS",
    ROOMS_REMOVE = "ROOMS_REMOVE",
    ROOMS_UPDATE = "ROOMS_UPDATE",

    ROOMS_RESPONSE_ERROR   = "ROOMS_RESPONSE_ERROR",
    ROOMS_RESPONSE_STATUS  = "ROOMS_RESPONSE_STATUS",
    ROOMS_RESPONSE_CLEAR   = "ROOMS_RESPONSE_CLEAR",
    ROOMS_STATE_CLEAR      = "ROOMS_STATE_CLEAR",
};

interface Rooms_Search {
    type: TYPES_ROOMS.ROOMS_SEARCH,
    payload: IRoom[]
};

interface Rooms_Chats {
    type: TYPES_ROOMS.ROOMS_CHATS,
    payload: IRoom[]
}

interface Rooms_Select {
    type: TYPES_ROOMS.ROOMS_SELECT,
    payload: IRoom
};

interface Rooms_Update {
    type: TYPES_ROOMS.ROOMS_UPDATE,
    payload: IRoom
};

interface Rooms_Create {
    type: TYPES_ROOMS.ROOMS_CREATE,
    payload: IRoom,
};

interface Rooms_Remove {
    type: TYPES_ROOMS.ROOMS_REMOVE,
    payload: IRoom
};

interface Rooms_Verify {
    type: TYPES_ROOMS.ROOMS_VERIFY,
    payload: IRoom,
};

interface Response_Status {
    type: TYPES_ROOMS.ROOMS_RESPONSE_STATUS,
    payload: ResponseType
};

interface Response_Error {
    type: TYPES_ROOMS.ROOMS_RESPONSE_ERROR,
    payload: ResponseType
};

interface Response_Clear {
    type: TYPES_ROOMS.ROOMS_RESPONSE_CLEAR
    payload?: string
};

interface State_Clear {
    type: TYPES_ROOMS.ROOMS_STATE_CLEAR,
    payload: {
        key: RoomsObjectKeys,
        value: any
    }
};

export type ACTION_ROOMS = 
    Rooms_Search | Rooms_Select | Rooms_Create | Rooms_Verify | Rooms_Chats | Rooms_Remove | Rooms_Update |
    Response_Status | Response_Error | Response_Clear | State_Clear
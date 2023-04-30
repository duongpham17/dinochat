/*TYPES**************************************************************************************************************/

export interface IMessage {
    _id: string,
    room: string,
    user_id: string,
    name: string,
    message: string,
    createdAt: Date
};

/*STATE**************************************************************************************************************/

export interface INITIALSTATE_MESSAGES {

};

/*ACTION**************************************************************************************************************/

export enum TYPES_MESSAGES {

};

export type ACTION_MESSAGES  = ""
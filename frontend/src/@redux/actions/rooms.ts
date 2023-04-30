import { Dispatch } from 'redux';
import { ACTION_ROOMS, TYPES_ROOMS, RoomsObjectKeys } from '@redux/types/rooms';
import { api } from '@redux/api';

const search = (name: string) => async (dispatch: Dispatch<ACTION_ROOMS>) => {
    try{
        const res = await api.get(`/rooms/search/${name}`);
        dispatch({
            type: TYPES_ROOMS.ROOMS_SEARCH,
            payload: res.data.data
        });
    } catch(err: any){
        console.log(err.response)
    }
};

const room = (id: string) => async (dispatch: Dispatch<ACTION_ROOMS>) => {
    try{
        const res = await api.get(`/rooms/${id}`);
        dispatch({
            type: TYPES_ROOMS.ROOMS_SELECT,
            payload: res.data.data
        });
    } catch(err: any){
        console.log(err.response)
    }
};

const update = (data: any) => async (dispatch: Dispatch<ACTION_ROOMS>) => {
    try{
        const res = await api.patch(`/rooms`, data);
        dispatch({
            type: TYPES_ROOMS.ROOMS_UPDATE,
            payload: res.data.data
        });
    } catch(err: any){
        console.log(err.response)
    }
};

const chats = () => async (dispatch: Dispatch<ACTION_ROOMS>) => {
    try{
        const res = await api.get(`/rooms`);
        dispatch({
            type: TYPES_ROOMS.ROOMS_CHATS,
            payload: res.data.data
        });
    } catch(err: any){
        console.log(err.response)
    }
};

const create = (data: any) => async (dispatch: Dispatch<ACTION_ROOMS>) => {
    try{
        const res = await api.post(`/rooms`, data);
        dispatch({
            type: TYPES_ROOMS.ROOMS_CREATE,
            payload: res.data.data
        });
    } catch(err: any){
        console.log(err.response)
    }
};

const verify_private = (data: any) => async (dispatch: Dispatch<ACTION_ROOMS>) => {
    try{
        const res = await api.post(`/rooms/verify/private`, data);
        dispatch({
            type: TYPES_ROOMS.ROOMS_VERIFY,
            payload: res.data.data
        });
    } catch(err: any){
        dispatch({
            type: TYPES_ROOMS.ROOMS_RESPONSE_ERROR,
            payload: {
                password: err.response.data.message
            }
        })
    }
};

const verify_public = (data: any) => async (dispatch: Dispatch<ACTION_ROOMS>) => {
    try{
        const res = await api.post(`/rooms/verify/public`, data);
        dispatch({
            type: TYPES_ROOMS.ROOMS_VERIFY,
            payload: res.data.data
        });
    } catch(err: any){
        dispatch({
            type: TYPES_ROOMS.ROOMS_RESPONSE_ERROR,
            payload: {
                password: err.response.data.message
            }
        })
    }
};

const remove = (_id: string) => async (dispatch: Dispatch<ACTION_ROOMS>) => {
    try{
        const res = await api.delete(`/rooms/${_id}`);
        dispatch({
            type: TYPES_ROOMS.ROOMS_REMOVE,
            payload: res.data.data
        });
    } catch(err: any){
        console.log(err.response)
    }
};

const state_clear = (key:RoomsObjectKeys, value: any) => async (dispatch: Dispatch<ACTION_ROOMS>) => {
    dispatch({
        type: TYPES_ROOMS.ROOMS_STATE_CLEAR,
        payload: { key, value }
    });
};

const Rooms = {
    create,
    search,
    room,
    verify_private,
    verify_public,
    chats,
    remove,
    update,

    state_clear
};

export default Rooms
import { api } from '@redux/api';
import { Dispatch } from 'redux';
import { ACTION_USER, TYPES_USER, IUser, UserObjectKeys } from '@redux/types/users';

const update = (data: IUser) => async (dispatch: Dispatch<ACTION_USER>) => {
    try{
        const res = await api.patch(`/users`, data);
        dispatch({
            type: TYPES_USER.USER,
            payload: res.data.data
        });
    } catch (error: any) {
        console.log("Please reload")
    }
};

const destroy = () => async (dispatch: Dispatch<ACTION_USER>) => {
    try{
        const res = await api.delete(`/users`);
        dispatch({
            type: TYPES_USER.USER,
            payload: res.data.data
        });
        localStorage.clear();
    } catch (error: any) {
        console.log("Please reload")
    }
};

const state_clear = (key:UserObjectKeys, value: any) => async (dispatch: Dispatch<ACTION_USER>) => {
    dispatch({
        type: TYPES_USER.USER_STATE_CLEAR,
        payload: { key, value }
    });
};

const User = {
    update,
    destroy,
    state_clear
};

export default User;
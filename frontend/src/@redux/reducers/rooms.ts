import { ACTION_ROOMS, TYPES_ROOMS, INITIALSTATE_ROOMS} from '@redux/types/rooms';

const initialState: INITIALSTATE_ROOMS = {
    rooms: null,
    room: null,
    chats: null,

    status: {},
    errors: {}
};

export const rooms = (state = initialState, action: ACTION_ROOMS) => {
    const {type, payload} = action;

    switch(type){
        case TYPES_ROOMS.ROOMS_SEARCH:
            return{
                ...state,
                rooms: payload
            };
        case TYPES_ROOMS.ROOMS_CREATE:
            return{
                ...state,
                rooms: state.rooms ? [payload, ...state.rooms] : [payload],
                chats: state.chats ? [...state.chats, payload] : [payload],
            };
        case TYPES_ROOMS.ROOMS_SELECT:
            return{
                ...state,
                room: payload
            };
        case TYPES_ROOMS.ROOMS_UPDATE:
            return{
                ...state,
                room: payload
            };
        case TYPES_ROOMS.ROOMS_REMOVE:
            return{
                ...state,
                room: null,
                chats: state.chats ? state.chats.filter( el=> el._id !== payload._id) : []
            };
        case TYPES_ROOMS.ROOMS_VERIFY:
            return{
                ...state,
                room: payload,
                chats: state.chats ? state.chats.some(el => el._id === payload._id) ? state.chats : [...state.chats, payload]: [payload],
            };
        case TYPES_ROOMS.ROOMS_CHATS:
            return{
                ...state,
                chats: payload
            };
        
        case TYPES_ROOMS.ROOMS_RESPONSE_STATUS:
            return{
                ...state,
                status: {...state.status, ...payload}
            }
        case TYPES_ROOMS.ROOMS_RESPONSE_ERROR:
            return{
                ...state,
                errors: {...state.errors, ...payload},
            }
        case TYPES_ROOMS.ROOMS_RESPONSE_CLEAR:
            return{
                ...state,
                status: {},
                errors: {}
            }
        case TYPES_ROOMS.ROOMS_STATE_CLEAR:
            return{
                ...state,
                [payload.key]: payload.value
            }
    

        default: 
            return state;
    }
}

export default rooms;
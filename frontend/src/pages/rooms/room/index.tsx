import useQuery from '@hooks/useQuery';
import {useAppDispatch, useAppSelector} from '@redux/hooks/useRedux';
import Rooms from '@redux/actions/rooms';

import Unverified from '../unverfied';
import Verified from '../verified'
import { useEffect } from 'react';

const Room = () => {

  const dispatch = useAppDispatch();

  const {getQuery, location} = useQuery();
  
  const {user} = useAppSelector(state => state.user);

  const {room} = useAppSelector(state => state.rooms);

  const room_id = getQuery().replace("?", "");

  useEffect(() => {
    dispatch(Rooms.room(room_id));
  }, [location, dispatch, room_id]); 

  return ( user && room &&
    <>
      { 
          room.password 
        ? 
          room.users.map(el => el.user_id).includes(user._id) 
        ? 
          <Verified />
        : 
          <Unverified room={room} />
        :
          <Verified />
      }
    </>
  )
}

export default Room
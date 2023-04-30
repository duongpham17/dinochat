import { useAppSelector} from '@redux/hooks/useRedux';
import { IUser } from '@redux/types/users';
import { IRoom } from '@redux/types/rooms';
import UseSocketContext from '../useSocketContext';

import Actions from './actions';
import Online from './online';
import Messages from './messages';
import Chatbox from './chatbox';

const Connected = ({user, room}: {user: IUser, room: IRoom}) => {

  return (
    <UseSocketContext user={user} room={room}>

        <Actions />

        <Online />

        <Messages />

        <Chatbox />

    </UseSocketContext>
  )

}

const Verified = () => {
  const {user} = useAppSelector(state => state.user);
  const {room} = useAppSelector(state => state.rooms); 
  return ( user && room && <Connected user={user} room={room} /> )
}

export default Verified
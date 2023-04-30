import styles from './Actions.module.scss';
import { useContext } from 'react';
import { useAppDispatch } from '@redux/hooks/useRedux';
import Rooms from '@redux/actions/rooms';

import useLoading from '@hooks/useLoading';
import useQuery from '@hooks/useQuery';

import { AiFillLock, AiFillUnlock, AiFillDelete, AiFillCrown } from 'react-icons/ai';

import Message from '@components/hover/Mesage';
import Spinner from '@components/loading/Spinner';

import ImageSelector from './ImageSelector';
import { Context } from '../../useSocketContext';
import { upload } from '@third-party/nftstorage';

const Actions = () => {

    const {roomData, user} = useContext(Context);
  
    const dispatch = useAppDispatch();
  
    const {navigate} = useQuery();
  
    const {loading: loadingRemove, onLoading: onLoadingRemove} = useLoading();
  
    const {loading: loadingUploadImage, onLoading: onLoadingUploadImage} = useLoading();
  
    const onDestroyRoom = async () => {
      await onLoadingRemove(() => dispatch(Rooms.remove(roomData?._id || "")) );
      navigate("/");
    };
  
    const onUploadImage = async (file: any) => {
      const {ipfs} = await upload(file);
      const url = `https://${ipfs}.ipfs.nftstorage.link`;
      await onLoadingUploadImage(() => dispatch(Rooms.update({...roomData, image: url})));
    };
  
    return ( roomData &&
      <ul className={styles.container}>
        <li>
          <Message message={roomData.password ? "Private" : "Public"}>
              {roomData.password ? <AiFillLock/>  : <AiFillUnlock/> } 
            </Message>
        </li>
  
        {user?._id === roomData.admin && 
        <>
          <li> 
            <Message message="Admin">
                <AiFillCrown/>
            </Message>
          </li>
  
          <li>
              {loadingUploadImage 
                ? <Spinner size={20} center /> 
                : <Message message="Profile"> <button><ImageSelector callback={onUploadImage} /></button></Message>
              }
          </li>
  
          <li> 
            {loadingRemove 
              ? <Spinner size={20} center /> 
              : <button className={styles.remove} onClick={onDestroyRoom}><Message message="Destroy"><AiFillDelete/></Message></button>
            }
          </li>
        </>
        }
      </ul>
    )
  };

export default Actions
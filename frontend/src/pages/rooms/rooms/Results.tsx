import styles from './Results.module.scss';
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import Rooms from '@redux/actions/rooms';
import { AiFillLock, AiFillUnlock, AiFillCrown } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import Message from '@components/hover/Mesage';
import { IRoom } from '@redux/types/rooms';

const Results = () => {

  const dispatch = useAppDispatch();

  const {user} = useAppSelector(state => state.user);

  const {rooms} = useAppSelector(state => state.rooms);

  const onJoin = (id: string, data: IRoom) => {
    dispatch(Rooms.room(id));
    if(!data.password) dispatch(Rooms.verify_public(data))
  };
  
  return (
    <div className={styles.container}>

      {!!rooms?.length && 
        <div className={styles.data}>
          <p>Found {rooms.length}</p>
        </div>
      }

      <div className={styles.results}>
        {rooms?.map(el => 
          <div key={el._id} className={styles.element}>
            <Link to={`?${el._id}`} onClick={() => onJoin(el._id, el)}>

              <div className={styles.profile}>
                <img src={el.image} alt="qs"/>
              </div>

              <div className={styles.information}>
                <p> {el._id.substring(19)} </p>
                <p> {el.name} </p>
              </div>

              <div className={styles.password}>
                {user?._id === el.admin && <Message message="Admin"><AiFillCrown/></Message>}
                <Message message={el.password ? "Private" : "Public"}>{el.password ? <AiFillLock/> : <AiFillUnlock/>}</Message>
              </div>

            </Link>
          </div>  
        )}
      </div>

    </div>
  )
}

export default Results
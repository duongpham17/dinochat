import styles from './Width1000.module.scss';
import { useAppSelector } from '@redux/hooks/useRedux';
import { Link } from 'react-router-dom';
import useQuery from '@hooks/useQuery';
import Message from '@components/hover/Mesage';
import { AiOutlineCrown } from 'react-icons/ai';
import Observer from '@components/observer';
import Round from '@components/container/Style3';

const Width1000 = () => {

    const {getQuery} = useQuery();
    const {user} = useAppSelector(state => state.user);
    const {chats} = useAppSelector(state => state.rooms);
    const id = getQuery();
    
    return (
        <div className={styles.container}>
            {chats?.map(el => 
                <Observer key={el._id}>
                    <div className={styles.element}>
                        <Round selected={id.substring(1) === el._id}>
                            <Link to={`?${el._id}`}>
                                    <div className={styles.item}>
                                        <img src={el.image} alt="qs" />
                                        <p>{el.name}</p>
                                    </div>
                                    <div className={styles.item}>
                                        {el.admin === user?._id && <Message message="admin"><AiOutlineCrown/></Message>}
                                    </div>
                            </Link>
                        </Round>
                    </div>    
                </Observer>
            )}
        </div>
    )
}

export default Width1000
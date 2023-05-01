import styles from './Width700.module.scss';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@redux/hooks/useRedux';
import { Link } from 'react-router-dom';
import useQuery from '@hooks/useQuery';
import Message from '@components/hover/Mesage';
import Observer from '@components/observer';
import Round from '@components/container/Style3';
import { AiFillCrown } from 'react-icons/ai';
import {MdOutlineKeyboardArrowLeft, MdKeyboardArrowDown} from 'react-icons/md';

const Width500 = () => {

    const [open, setOpen] = useState(false);
    const {getQuery, location} = useQuery();
    const {user} = useAppSelector(state => state.user);
    const {chats, room} = useAppSelector(state => state.rooms);
    const id = getQuery();

    useEffect(() => {
        setOpen(false);
    }, [location]);

    return (
        <div className={styles.container}>
            {!open &&
                <div className={styles.findChats}>
                    <button onClick={() => setOpen(!open)}> 
                        <MdOutlineKeyboardArrowLeft/>     
                        {!id ? "Chat rooms" : <img src={room?.image} alt="i" />}
                        {!id ? "" : <p>{room?.name}</p>}
                    </button>
                </div>
            }

            {open && 
                <>
                
                    <div className={styles.findChats}>
                        <button onClick={() => setOpen(!open)}> 
                            <MdKeyboardArrowDown/>     
                            {!id ? "Back" : <img src={room?.image} alt="i" />}
                            {!id ? "" : <p>{room?.name}</p>}
                        </button>
                    </div>

                    <div className={styles.chatList}>
                        {chats?.map(el => 
                            <Observer key={el._id}>
                                <Round selected={id.substring(1) === el._id}>
                                    <Link to={`?${el._id}`} className={styles.element} onClick={() => setOpen(false)}>
                                        <div className={styles.image}>
                                            <img src={el.image} alt="qs" />
                                            <p>{el.name}</p>
                                        </div>
                                        <div className={styles.admin}>
                                            {el.admin === user?._id && <Message message="admin"><AiFillCrown/></Message>}
                                        </div>
                                    </Link>  
                                </Round>
                            </Observer>  
                        )}
                    </div>

                </>
            }
        </div>
    )
};

export default Width500;
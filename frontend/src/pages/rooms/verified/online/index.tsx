import styles from './Online.module.scss';
import { useContext, useState } from 'react';
import Message from '@components/hover/Mesage';

import { Context } from '../../useSocketContext';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

const Users = () => {

    const [showMore, setShowMore] = useState(false);

    const {roomData} = useContext(Context);

    const onShowMore = () => setShowMore((state) => !state);
    
    return (
      <div className={styles.container}>

        <div className={styles.header}>
             <ul>
                { roomData?.users?.slice(0, 9).map(el => ( 
                    el.online && 
                    <Message message={el.name} key={el._id}>
                        <li>{el.name.substring(0, 1).toUpperCase()}</li>    
                    </Message>
                ))}
            </ul>

            <button onClick={onShowMore}>
                <Message message="Everyone">
                    <div className={styles.showmore}>
                        <p className={styles.online}>{roomData?.users?.filter(el => el.online).length} Online</p>
                        {showMore ? <MdKeyboardArrowDown/> : <MdKeyboardArrowRight />}
                    </div>
                </Message>
            </button>
        </div>

        {showMore && 
            <ul className={styles.allUsers}>
                {roomData?.users?.map(el => ( 
                    el.online && 
                    <li key={el._id}>{el.name}</li>   
                ))}
            </ul>
        }

      </div>
    )
  }
  
export default Users
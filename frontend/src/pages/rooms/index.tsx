import styles from './Home.module.scss';
import useQuery from '@hooks/useQuery';

import Chats from './chats';
import Rooms from './rooms';
import Room from './room';

const Index = () => {

  const {getQuery} = useQuery();

  const isARoom = getQuery();
  
  return (
    <div className={styles.container}>

      <div className={styles.chats}>
        <Chats />        
      </div>

      <div className={styles.rooms}>
        {isARoom 
        ? <Room />
        : <Rooms />
        }
      </div>
      
    </div>
  )
}

export default Index
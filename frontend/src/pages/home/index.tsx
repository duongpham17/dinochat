import styles from './Home.module.scss';
import {Link} from 'react-router-dom';
import HackerText from '@components/animation/HackedText';
import { useAppDispatch } from '@redux/hooks/useRedux';
import Rooms from '@redux/actions/rooms';

const Home = () => {
  const dispatch = useAppDispatch();

  const onClick = async () => {
    const message = await dispatch(Rooms.messages);
    console.log(message);
  }

  return (
    <div className={styles.container}>
        <button onClick={onClick}>click me</button>
        <h2><HackerText text="Welcome to Dinochat"/></h2>
        <br/><br/>
        <HackerText text="WARNING!"/>
        <br/><br/>
        <HackerText text="Chat history can abrupty disappear !"/>
        <br/><br/>
        <HackerText text="Chat might not exist tomorrow !"/>
        <br/><br/>
        <HackerText text="Fellow dinos might vanish?"/>
        <br/><br/><br/>
        <Link to="/room">Find out why</Link>
    </div>
  )
}

export default Home
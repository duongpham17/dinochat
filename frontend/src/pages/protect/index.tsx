import styles from './Protect.module.scss';
import {Link} from 'react-router-dom';
import HackerText from '@components/animation/HackedText';

const Protect = () => {
  return (
    <div className={styles.container}>
      <Link to="/login">
        <HackerText text="Login to gain access" lowercase/>
      </Link>
    </div>
  )
}

export default Protect
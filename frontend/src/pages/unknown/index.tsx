import styles from './Unknown.module.scss';
import {Link} from 'react-router-dom';
import HackerText from '@components/animation/HackedText';

const Unknown = () => {
  return (
    <div className={styles.container}>
      <Link to="/">
        <HackerText text="404 | Page not found" lowercase />
      </Link>
    </div>
  )
}

export default Unknown
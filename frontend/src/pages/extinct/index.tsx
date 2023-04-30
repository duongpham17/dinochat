import styles from './Extinct.module.scss';
import HackerText from '@components/animation/HackedText';

const Extinct = () => {
  return (
    <div className={styles.container}>
        <HackerText text="Your account has been destroyed by a meteor!" />
    </div>
  )
}

export default Extinct
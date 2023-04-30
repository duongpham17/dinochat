import styles from './Navbar.module.scss';

import Login from './login';
import Theme from './theme';
import Logo  from './logo';
import Chats  from './chats';

const Navbar = () => {
  return (
    <div className={styles.container}>

      <div className={styles.items}>
        <Logo/>
      </div>

      <div className={styles.items}>
        <Chats />
        <Theme />
        <Login />
      </div>

    </div>
  )
}

export default Navbar
import styles from './Logo.module.scss';
import { useContext } from 'react';
import { Context } from 'themes';
import {Link} from 'react-router-dom'

const Logo = () => {

  const {theme} = useContext(Context);

  return ( 
    <Link to="/" className={styles.container}>
      <img src={theme.name === "light" ? "/logo/black_transparent.png" : "/logo/white_transparent.png"} alt="logo"/>
      <span>Dinochat</span>
    </Link>

  )
}

export default Logo
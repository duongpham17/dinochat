import styles from './Home.module.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import HackerText from '@components/animation/HackedText';

const Home = () => {
  return (
    <div className={styles.container}>
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
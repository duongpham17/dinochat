import styles from './index.module.scss'
import {Routes, Route} from 'react-router-dom';

import Private from 'pages/Private';

import Home from 'pages/home';
import Rooms from 'pages/rooms';
import Login from 'pages/login';
import Confirm from 'pages/confirm';
import Account from 'pages/account';
import Unknown from 'pages/unknown';
import Extinct from 'pages/extinct';

const Pages = () => {
  return (
    <div className={styles.container}>
      <Routes>
       <Route path="/" element={<Home/>} />
        <Route path="/extinct" element={<Extinct/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/confirm/:token" element={<Confirm/>} />
        <Route path="/room" element={<Private component={Rooms} />} />
        <Route path="/account" element={<Private component={Account} />} />
        <Route path="*" element={<Unknown/>} />
      </Routes>
    </div>
  )
}

export default Pages
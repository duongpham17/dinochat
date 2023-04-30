import styles from './Messages.module.scss';
import { useContext, useEffect, useRef } from 'react';
import { Context } from '../../useSocketContext';
import { date, generateid } from '@utils/functions';

const Messages = () => {

  const ref = useRef<HTMLDivElement>(null);

  const {user, messagesData} = useContext(Context);

  useEffect(() => {
    if(!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [messagesData]);

  const HTML_STUFF = (text: string) =>  {
    return (
      text.split(" ").map((el, i) => 
        el.includes("http") || el.includes(".com") || el.includes(".co.uk") || el.includes(".co") || el.includes(".io") ? 
          <a key={i} href={el} target="_blank" rel="noreferrer">{el}</a>
          : 
          <span key={i}>{el}</span>
      )
    )
  }

  return ( user && messagesData &&
      <div className={styles.container} ref={ref}>
        {messagesData.map((el) => 
          <div className={`${styles.element} ${user._id === el.user_id ? styles.admin : styles.others}`} key={generateid(4)}>
            <div className={styles.filler} />
            <div className={styles.information}>
              <label className={styles.name}>{user._id !== el.user_id ? el.name : ""}</label>
              <div className={styles.message}>{HTML_STUFF(el.message)}</div>
              <small>{date(el.createdAt)}</small>
            </div>
          </div>
        )}
      </div>
  )

}

export default Messages
import styles from './Style2.module.scss'
import React, {useState} from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: any,
    children: React.ReactNode,
}

const Strategy = ({children, title, ...props}: Props) => {

    const [open, setOpen] = useState(false);

    const onOpen = (e: any) => {
        e.stopPropagation();
        setOpen(!open);
    }

    return (
        <div className={styles.container} onClick={onOpen} {...props}> 

            {open && 
                children
            }

            {!open &&
                title
            }

            <button className={`${styles.arrows} ${open ? styles.open : styles.close}`}>
                <MdKeyboardArrowDown/>
            </button>

        </div>
  )
}

export default Strategy
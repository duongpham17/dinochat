import styles from './Chatbox.module.scss';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { Context } from '../../useSocketContext';
import { MdSend } from 'react-icons/md';

const Chatbox = () => {

    const textarea_ref = useRef<HTMLTextAreaElement>(null);

    const {onEmitSendMessage} = useContext(Context);

    const [message, setMessage] = useState("");
    
    const [height, setHeight] = useState(20)

    const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!message) return;
        onEmitSendMessage(message);
        setMessage("");
        if(!textarea_ref.current) return;
        textarea_ref.current.focus();
        setHeight(20);
    };

    useEffect(() => {
        if(height >= 100) return;

        const resize = (key: KeyboardEvent) => {
            if(key.code.toLowerCase() === "enter"){
                setHeight((h) => h + 20)
            }
        }

        window.addEventListener("keydown", resize);

        return () => window.removeEventListener("keydown", resize);
        
    }, [height])

    return (
        <form className={styles.container} onSubmit={onSendMessage}>
            <textarea ref={textarea_ref} autoFocus value={message} onChange={e => setMessage(e.target.value)} style={{"height": `${height}px`}}/>
            <button><MdSend/></button>
        </form>
    )
}

export default Chatbox
import styles from './Search.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@redux/hooks/useRedux';
import Rooms from '@redux/actions/rooms';
import Spinner from '@components/loading/Spinner';
import { MdClear } from 'react-icons/md';
import {AiOutlineSearch} from 'react-icons/ai';

const Search = () => {

    const dispatch = useAppDispatch();
  
    const [value, setValue] = useState("");
  
    const [searching, setSearching] = useState<"" | "searching" | "done">("");
  
    useEffect(() => {
      if(searching === "") return;
  
      if(!value) return setSearching("");
      
      let timeout = setTimeout(() => {
        dispatch(Rooms.search(value));
        setSearching("done");
      }, 500);
  
      return () => clearTimeout(timeout);
    }, [value, dispatch, searching]);
  
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearching("searching");
      setValue(e.target.value);
    };
    
    return (
      <div className={styles.container}>
        <AiOutlineSearch className={styles.icon}/>
        <input value={value} onChange={onSearch} placeholder="Find chat rooms" />
        {searching === "searching" 
          ? <div className={styles.actions}><Spinner size={15}/></div> 
          : ( value ? <button onClick={() => setValue("")} className={styles.actions}><MdClear /></button> : "" )
        }
      </div>
    )
};


export default Search
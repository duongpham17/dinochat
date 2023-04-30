import styles from './Destroy.module.scss';
import { useAppDispatch } from '@redux/hooks/useRedux';
import useLoading from '@hooks/useLoading';
import User from '@redux/actions/user';
import Summary from '@components/summary/Style1';
import Button from '@components/buttons/Button';
import Line from '@components/line/Style1';
import {FaMeteor} from 'react-icons/fa';

const Destory = () => {

    const {loading, onLoading} = useLoading();

    const dispatch = useAppDispatch();

    const onDestroy = async () => {
        await onLoading(dispatch(User.destroy));
        window.location.replace('/extinct');
    };

    return (
        <div className={styles.container}>
            <Summary title="Destory account" background='dark'>
                <Line />
                <Button 
                    label1="Confirm extinction of account" 
                    label2={<FaMeteor/>} 
                    color='red' 
                    onClick={onDestroy}
                />
            </Summary>

            { loading && 
                <div className={styles.awaitingExtinction}>
                    <div>
                        <FaMeteor className={styles.meteor}/>
                        <p>Incoming Extinction !</p>
                    </div>
                </div>
            }

        </div>
    )
}

export default Destory
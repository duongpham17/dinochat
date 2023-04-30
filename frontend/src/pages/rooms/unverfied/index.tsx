import styles from './Unverified.module.scss'; 
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import { IRoom } from '@redux/types/rooms';

import useForm from '@hooks/useForm';
import Input from '@components/inputs/Input';
import Button from '@components/buttons/Button';
import Text from '@components/text/Style3';
import Rooms from '@redux/actions/rooms';
import Spinner from '@components/loading/Spinner';

interface Props {
    room: IRoom
};

const Unverified = ({room}: Props) => {

    const dispatch = useAppDispatch();

    const {errors} = useAppSelector(state => state.rooms);

    const mutatedRoomState = {...room, passwordCheck: ""};

    const {values, onChange, edited, loading, onSubmit} = useForm(mutatedRoomState, callback);

    async function callback(){
        await dispatch(Rooms.verify_private(values));
    };

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit}>
                <Input label1="Password" type="password" autoComplete='' 
                    name="passwordCheck" value={values.passwordCheck} onChange={onChange} 
                />
                {errors.password ? <Text name={errors.password} value="" color="red" size={12} /> : ""}
                {edited && !loading && <Button type="submit" label1="join" color='main' />}
                {loading && <Spinner center />}
            </form>
        </div>
    )
}

export default Unverified
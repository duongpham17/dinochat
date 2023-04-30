import {useAppDispatch, useAppSelector} from '@redux/hooks/useRedux';

import User from '@redux/actions/user';
import useForm from '@hooks/useForm';
import validation from '@validations/user';

import Summary from '@components/summary/Style1';
import Line from '@components/line/Style1';
import Input from '@components/inputs/Input';
import Button from '@components/buttons/Button';
import Spinner from '@components/loading/Spinner';

const Name = () => {

    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.user);

    const {values, onChange, onSubmit, errors, loading, edited} = useForm(user, callback, validation);

    async function callback(){
        if(values) await dispatch(User.update(values));
    }

    return ( values &&
        <Summary title={user?.name} background="dark">
            <Line />
            <form onSubmit={onSubmit}>
                <Input label1="Change username" label2={errors.name && errors.name} error
                    name="name" value={values.name} onChange={onChange}
                />
                {!loading && edited && <Button type="submit" label1="update" color='main'/>}
                {loading && <Spinner />}
            </form>
        </Summary>
    )
}

export default Name
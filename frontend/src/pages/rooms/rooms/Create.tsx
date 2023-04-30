import { useAppDispatch } from '@redux/hooks/useRedux';
import Rooms from '@redux/actions/rooms';

import Spinner from '@components/loading/Spinner';
import Input from '@components/inputs/Input';
import useForm from '@hooks/useForm';
import validation from '@validations/rooms';
import Button from '@components/buttons/Button';
import Flex from '@components/flex/Flex';
import Summary from '@components/summary/Style1';
import useLoading from '@hooks/useLoading';

const Create = () => {

    const {onLoading, loading} = useLoading();
  
    const dispatch = useAppDispatch();
  
    const initialState = {
      name: "",
      password: "",
    };
  
    const {values, onChange, onSubmit, edited, errors, onClear} = useForm(initialState, callback, validation);
  
    async function callback(){
      await onLoading(() => dispatch(Rooms.create(values)));
      onClear();
    };
  
    return (
      <Summary title="Create a room" background='dark'>
  
        <form onSubmit={onSubmit}>
  
          <Flex>
            <Input label1="Name" label2={errors.name ? errors.name : ""} error 
              name="name" value={values.name} onChange={onChange} 
            />
            <Input type="password" autoComplete="" label1="Password" placeholder='Public if empty'
              name="password" value={values.password} onChange={onChange} 
            />
          </Flex>
  
          {edited && !loading && <Button label1="create room" type="submit" color="main"/>}
  
          {loading && <Spinner center />}
  
        </form>
  
      </Summary>
    )
  }

export default Create
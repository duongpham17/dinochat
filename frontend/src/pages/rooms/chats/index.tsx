import {lazy, Suspense} from 'react';
import Rooms from '@redux/actions/rooms';
import useFetch from '@redux/hooks/useFetch';
import useWindowSize from '@hooks/useWindow';

const Width700 = lazy(() => import("./Width700"));
const Width1000 = lazy(() => import("./Width1000"));

const Chats = () => {

    const {width} = useWindowSize();

    useFetch(Rooms.chats());

    return (
        <>
            { 700 >= width
                ? 
                <Suspense>
                    <Width700 />
                </Suspense>
                : 
                <Suspense>
                    <Width1000 />
                </Suspense>
            }
        </>
    )
}

export default Chats
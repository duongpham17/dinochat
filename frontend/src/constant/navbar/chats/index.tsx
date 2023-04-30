import { AiFillMessage } from 'react-icons/ai';
import LinksContainer from '@components/link/Style1'

const Chats = () => {

    const data = [{
        name: <AiFillMessage/>,
        to: "/room"
    }]

    return ( <LinksContainer data={data} />)
}

export default Chats
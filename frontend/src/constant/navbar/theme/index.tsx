import {useContext} from 'react';
import {Context} from 'themes';
import {MdNightlight, MdWbSunny, MdBolt} from 'react-icons/md';
import LinksContainer from '@components/link/Style1'

const Theme = () => {

    const {onSetTheme, theme} = useContext(Context);

    const data = [{
        to: "",
        button: true,
        name: theme.name === "light" ? <MdWbSunny/> 
        : theme.name === "night" ? <MdNightlight/> 
        : <MdBolt/>,
        onClick: () => onSetTheme()
    }]

    return ( <LinksContainer data={data} /> )
}

export default Theme
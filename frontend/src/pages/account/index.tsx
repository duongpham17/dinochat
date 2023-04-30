import styles from './Account.module.scss';
import React from 'react';

import Logout from './logout';
import Email from './email';
import Name from './name';
import Destory from './destroy';

const Account = () => {

    const Box = ({children}: {children: React.ReactNode}) => (
        <div className={styles.box}>
            {children}
        </div>
    )

    return (
        <div className={styles.container}>

            <Box>
                <Logout />
            </Box>

            <Box>
                <Name />
            </Box>

            <Box>
                <Email />
            </Box>

            <Box>
                <Destory />
            </Box>
            
        </div>
    )
}

export default Account
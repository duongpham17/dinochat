import styles from './ImageSelector.module.scss';
import React from 'react';
import Resizer from "react-image-file-resizer";

import { BsImage } from 'react-icons/bs';

interface Props {
    callback?: any; 
}

const ImageChanger = ({callback} : Props) => {

    const resizeFile = (file: any) => new Promise(resolve => {
        if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp") {
            return Resizer.imageFileResizer(file, 40, 40, 'JPEG', 20, 0, uri => { resolve(uri) }, 'blob');
        }
    });

    const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>)=> {
        e.preventDefault();
        const file = e.target.files;
        if(!file) return;
        const resize = await resizeFile(file[0]);
        if(callback) callback(resize);
    };

    return (
        <div className={styles.container}>
            <label htmlFor="myfile"><BsImage/></label>
            <input type="file" id="myfile" accept='image/*' className={styles.inputFile} onChange={onChangeFile} />
        </div>
    )
}

export default ImageChanger
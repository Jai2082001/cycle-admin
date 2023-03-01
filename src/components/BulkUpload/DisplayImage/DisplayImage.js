import { useEffect } from 'react';
import classes from './DisplayImage.module.css'
const DisplayImages = ({serial, changeDisplay}) => {
    
    const image1 = require(`../../images/product/${serial}.1.jpg`).default;
    const image2 = require(`../../images/product/${serial}.2.jpg`).default;
    const image3 = require(`../../images/product/${serial}.3.jpg`).default;
    const image4 = require(`../../images/product/${serial}.4.jpg`).default;

    const array = [];

    array.push(image1);
    array.push(image2);
    array.push(image3);
    array.push(image4);

    // useEffect(()=>{
    //     changeDisplay(array)
    // }, [])

    return (
    <td className={classes.parentDiv}>
        {'4 images picked from the folder '}
    </td>
    )
}

export default DisplayImages
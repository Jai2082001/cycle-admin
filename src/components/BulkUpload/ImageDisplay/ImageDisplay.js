import classes from './ImageDisplay.module.css'
import { useEffect } from 'react'
const ImageDisplay = ({serial, changeImage}) => {

    // useEffect(()=>{
    //     changeImage(image)
    // }, [])

    const image = require(`../../images/product/${serial}.1.jpg`).default
    
    
    return (
        <td className={classes.imgDiv}>
            <img src={image}></img>
        </td>
    )
}

export default ImageDisplay
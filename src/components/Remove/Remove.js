import {Form, Button, Modal, Spinner, Alert} from 'react-bootstrap'
import Select from 'react-select'
import { useEffect, useState, useRef } from 'react'
import classes from './Remove.module.css'

const Remove = () => {
    const [products, changeProducts] = useState([]);
    const [loading, changeLoading] = useState(false);
    const [singleProduct, changeSingleProduct] = useState(false);
    const [changer, setChanger] = useState(0);

    useEffect(()=>{
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/productDisplayWhole`).then((response)=>{
            return response.json()
        }).then((response)=>{
            changeProducts(response)
            changeLoading(false)
        })
    }, [changer])

    console.log(products)

    const productType = products.map((singleItem)=>{
        return {label: singleItem.name, value: singleItem}
    })

    const btnHandler = () => {
        changeLoading(true);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/removeProduct`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(singleProduct)
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response);
            changeLoading(false);
            setChanger((prevState)=>{
                return prevState + 1;  
            })
        })
    }


    return (
        <>
        {loading && 
                <Modal.Dialog className='pt-3 pl-3'>
                    <Spinner animation='border'></Spinner>
                </Modal.Dialog>
        }
        {!loading && 
        <div className={classes.removeParentDiv}>
            <Select options={productType} onChange={(value)=>{
                changeSingleProduct(value)
            }}></Select>
        </div>}
        
        {singleProduct && <Button onClick={btnHandler} className={'mt-3'} variant='danger'>Remove Button</Button>}
        </>
    )
}

export default Remove
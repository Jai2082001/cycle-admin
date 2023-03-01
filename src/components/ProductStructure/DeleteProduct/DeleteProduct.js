import classes from './DeleteProduct.module.css'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import {Button, Spinner} from 'react-bootstrap'

const DeleteProduct = ({secondDataArray, changeReloadState}) => {
    
    console.log(secondDataArray)
    const [product,  changeProduct] = useState(false);
    const [loading, changeLoading] = useState(false);

    console.log(product);

    const buttonHandler = () => {
        changeLoading(true)
        console.log(product)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/deleteProductStruct`, {
            headers: {
                producttype: product
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response);
            changeLoading(false)
            changeReloadState((state)=>{
                return state + 1
            })
        })
    }

    return (
        <div className='mt-2'>
            <Select options={secondDataArray} onChange={(value)=>{
                changeProduct(value.label);
            }}></Select>

            {product && <Button onClick={buttonHandler} className={'mt-2'}>{loading && <Spinner animation='border'></Spinner>}{!loading && 'Delete Product'}</Button>}       
        </div>
    )
}

export default DeleteProduct
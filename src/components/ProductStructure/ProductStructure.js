import { useEffect, useState } from 'react'
import classes from './ProductStructure.module.css'
import { Form, Spinner } from 'react-bootstrap'
import Select from 'react-select'
import { Button } from 'react-bootstrap'
import SingleProductStruct from './SingleProductStruct/SingleProductStruct'
import AddProductStruct from './AddProductStruct/AddProductStruct'
import DeleteProduct from './DeleteProduct/DeleteProduct'


const ProductStructure = () => {

    const [loader, changeLoader] = useState(false);
    const [dataArray, changeDataArray] = useState([]);
    const [data, changeData] = useState([])
    const [action, changeAction] = useState('edit');
    const [reloadState, changeReloadState] = useState(0);

    useEffect(()=>{
        changeLoader(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryDisplay`).then((response) => {
            return response.json()
        }).then((response) => {
            changeDataArray(response);
            fetch(`${process.env.REACT_APP_FETCH_LINK}/displayProductType`).then((response)=>{
                return response.json()
            }).then((response)=>{
                changeData(response);
                changeLoader(false)
            })
        })
    }, [reloadState])

    const secondDataArray = data.map((singleItem)=>{
        return {label: singleItem.name, value: singleItem}
    })

    // console.log(dataArray);
    // console.log(data)
    
    return (
        <>

        {loader && <Spinner animation='border'></Spinner>}
        {!loader && 
        <div className={classes.parentDiv}>
            Product Structure

            <Form>
                <Button onClick={()=>{changeAction('add')}}>Add Product Structure</Button>
                <Button onClick={()=>{changeAction('edit')}} className={'ms-2'}>Edit Product Structure</Button>
                <Button onClick={()=>{changeAction('delete')}} className={'ms-2'}>Delete Product Structure</Button>
                {action === 'edit' && 
                <>
                    <SingleProductStruct changeReloadState={changeReloadState} secondDataArray={secondDataArray}></SingleProductStruct>           
                </>}

                {action === 'add' && 
                <>
                    <AddProductStruct changeReloadState={changeReloadState}></AddProductStruct>       
                </>}
                {action === 'delete' && 
                <>
                    <DeleteProduct  changeReloadState={changeReloadState} secondDataArray={secondDataArray}></DeleteProduct>
                </>}
                {}
            </Form>       
        </div>}
        
        </>
    )
}

export default ProductStructure
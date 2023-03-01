import {Form, Button, Spinner} from 'react-bootstrap'
import classes from './AddProductStruct.module.css'
import {useEffect, useState, useRef} from 'react'
import { Alert } from 'react-bootstrap';

const AddProductStruct = ({changeReloadState}) => {
    
    const inputRef = useRef();
    const [loading, changeLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [productType, changeProductType] = useState('');
    const [category, changeCategory] = useState([]);
    const [filter, changeFilter] = useState([]);
    const [loading2, changeLoading2] = useState(false)
    const [cat, setCat] = useState(false);
    const [fil, setFil] = useState(false);
    const [status, changeStatus] = useState(false);

    const buttonHandler = (event) => {
        event.preventDefault();
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/addProductType`, {
            headers: {
                name: inputRef.current.value
            }
        }).then((response)=>{
            return response.json();
        }).then((response)=>{
            console.log(response)
            if(response.status === 'alreadyInserted'){
                window.location.reload()
            }else{
                console.log(response);
            setDone(true)
            changeProductType(response.name)
            changeLoading(false)
            }
            
        })
    }
    
    const CategoryAdder = () => {
        let categoryRef = useRef();
        let imageRef = useRef();
        const [loading, changeLoading] = useState(false)
        
        const changeCategoryInput = () => {
            changeLoading(true)
            console.log('here')
            let prevArray = category;
            if(categoryRef.current.value.length > 2){

                let includes = false;
                prevArray.map((singleItem)=>{
                    if(singleItem.name === categoryRef.current.value){
                        includes = true
                    }
                })

                if(includes === false){
                    console.log("includes false")
                    if(imageRef.current.files.length > 0){
                        console.log('done nnn')
                        const obj = {}
                        obj.name = categoryRef.current.value;
                        const file = imageRef.current.files[0];
                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function(event){
                            obj.img = event.target.result
                            prevArray.push(obj);
                            changeCategory(prevArray)
                            changeLoading(false)
                        }    
                    }else{
                        changeLoading(false)
                        return
                    }
                    
                }else{
                    changeLoading(false)
                }
                
            }else{
                changeLoading(false)
                return
            }
        }

        return (
            <div>
                <Form.Control ref={categoryRef}></Form.Control>
                <Form.Control ref={imageRef} type='file'></Form.Control>
                <Button onClick={changeCategoryInput}>{loading && <Spinner animation='border'></Spinner>}{!loading && 'Add Category'}</Button>
            </div>
        )
    }

    console.log(category)

    const FilterAdder = ({categories}) => {
        let filterRef = useRef()
        
        const changeFilterInput = () => {
            let prevArray = category;
            if(filterRef.current.value.length > 2){
                prevArray.map((singleItem)=>{
                    if(singleItem.name === categories){
                        if(singleItem.filterArray){
                            singleItem.filterArray.push(filterRef.current.value)
                        }else{
                            singleItem.filterArray = [];
                            singleItem.filterArray.push(filterRef.current.value)
                        }
                    }
                })


                console.log(prevArray)
                changeCategory(prevArray)

            }else{
                return
            }
        }

        return (
            <div>
                <Form.Control ref={filterRef}></Form.Control>
                <Button onClick={changeFilterInput}>Add Filter</Button>
            </div>
        )
    }

    const categoryAdder = (event) => {
event.preventDefault()
        setCat((prevState)=>{
            return !prevState
        })
    }

    const filterAdder = (event) => {
        event.preventDefault()
        setFil((prevState)=>{
            return !prevState
        })
    } 

    const submitStructure = () => {
        console.log("Submit Structure")
        changeStatus(false)
        changeLoading2(true)
        const obj =   {
            productType: productType,
            category: category
        }
        fetch(`${process.env.REACT_APP_FETCH_LINK}/productStruct`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'addedby': 'Admin'  
            },
            method: "POST", 
            body: JSON.stringify(obj)
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            if(response.status === 'done'){
                changeStatus('Done')
            }else{
                changeStatus('Not Done')
            }
            changeLoading2(false)
            console.log(response);
            changeReloadState((prevState)=>{
                return prevState + 1
            })
        })
    }

    return (
        <div className={classes.parentDiv}>
            {status=== 'Done' && <Alert>{'Inserted'}</Alert>}
            {status=== 'Not Done' && <Alert variant={'danger'}>{'Error Occured'}</Alert>}
            <Form className={'mt-2 ms-2'}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Add the Product Type</Form.Label>
                    {!done && <Form.Control ref={inputRef}  placeholder="Enter Product Type" />}
                    {done && <Form.Control readOnly value={productType}></Form.Control>}
                </Form.Group>
                {!done &&                 
                <Button onClick={buttonHandler} variant="primary" type="submit">
                        {!loading && 'Submit the Category'}
                        {loading && <Spinner animation="border" role="status"></Spinner>}
                </Button>}
                {done && 
                <Form.Group className={classes.childParent}>
                    <div>
                        Category Adder
                        <button onClick={categoryAdder}>+</button>
                        <div className={classes.inputDiv}>
                            {category.map((singleItem)=>{
                                return (
                                    <>
                                    <Form.Control readOnly value={singleItem.name}></Form.Control>
                                        {singleItem.filterArray && 
                                        <>
                                            {singleItem.filterArray.map((single)=>{
                                                return <Form.Control readonly value={single}></Form.Control>
                                            })}
                                        </>}
                                    
                                    <button onClick={filterAdder}>Filter Adder</button>
                                    {fil && <FilterAdder categories={singleItem.name}></FilterAdder>}
                                    </>
                                    )
                            })}
                            {cat && <CategoryAdder></CategoryAdder>}
                        </div>
                    </div>
                    <div>
                        {/* Filter Adder
                        <button onClick={filterAdder}>+</button>
                        <div className={classes.inputDiv}>
                            {filter.map((singleItem)=>{
                                return (
                                    <Form.Control readOnly value={singleItem}></Form.Control>
                                )
                            })}
                            {fil && <FilterAdder></FilterAdder>}
                        </div> */}
                    </div>
                </Form.Group>
                }

        {done  && category.length>0 && 
        <>
            <div className={classes.submitStructure}>
                <Button onClick={submitStructure}>
                    {loading2 && <Spinner animation='border'></Spinner>}
                    {!loading2 && 'Submit Structure'}
                </Button>
            </div>
        </>}
            
            </Form>

        </div>
    )
}



export default AddProductStruct
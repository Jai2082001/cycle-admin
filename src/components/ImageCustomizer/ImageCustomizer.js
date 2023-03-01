import classes from './ImageCustomizer.module.css'
import {Button, Form, Container, Spinner, Modal } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'
import Select from 'react-select'


const ImageCustomizer  = () => {
    
    const bannerRef = useRef()
    const bannerAddRef = useRef()
    const addImgRef = useRef();
    const updateImgRef = useRef();
    const [state, changeState] = useState();
    const [images, changeImages] = useState([]);
    const [removeId, changeRemoveId] = useState(false);
    const [updateId, changeUpdateId] = useState(false);
    const [loading, changeLoading] = useState(false);
    const [productNames, changeProductNames] = useState([]);
    const [singleProduct, changeSingleProduct] = useState(false)
    useEffect(()=>{
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/imgSliderDisplay`).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response)
            changeImages(response.images);        
            fetch(`${process.env.REACT_APP_FETCH_LINK}/productNames`).then((response)=>{
                return response.json()
            }).then((response)=>{
                console.log(response)
                changeProductNames(response)
                changeLoading(false)
            })
        })
    }, [])

    const productOptions = productNames.map((singleItem)=>{
        console.log(singleItem)
        return {label: singleItem, value: singleItem}
    })

    const btnHandler = (event) => {
        console.log(event.target.id)
        changeState(event.target.id);
    }

    const removeHandler = () => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/imgRemove`, {
            headers: {
                removeid: removeId
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response);
        })
    }

    const addImgHandler = () => {
        if(addImgRef.current.files.length > 0){
            const filereader = new FileReader();
            const file = addImgRef.current.files[0];
            filereader.readAsDataURL(file);
            filereader.onload = function(event){
                const data = {img: event.target.result, product: singleProduct};
                fetch(`${process.env.REACT_APP_FETCH_LINK}/imgAddSlider`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'addedBy': 'admin'
                    },
                    body: JSON.stringify(data)
                })
            }
        }
    }

    const updateHandler = () => {
        if(updateImgRef.current.files.length > 0){
            const filereader = new FileReader();
            const file = updateImgRef.current.files[0];
            filereader.readAsDataURL(file);
            filereader.onload = function(event){
                const data = {img: event.target.result};
                fetch(`${process.env.REACT_APP_FETCH_LINK}/imgUpdate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'addedBy': 'admin',
                        updateid: updateId
                    },
                    body: JSON.stringify(data)
                })
            }
        }
    
    }
        
    

    let options = images.map((singleItem, idx)=>{
        return {label: idx, value: idx}
    })

    let options2 = [{label: 1, value: 1}, {label: 2, value: 2}, {label:3 , value: 3}, {label: 4, value: 4},{label: 5, value: 5}] 

    return (
        <>
        {loading && 
            <Modal.Dialog>
                <Spinner animation='border'></Spinner>
            </Modal.Dialog>}

        {!loading && 
        <>
            <div className={classes.parentDiv}>
            <div className='mt-3 ms-3'>
               <Button id={'addImgSlider'} onClick={btnHandler}>Add Image To the Slider </Button>
               <Button id={'removeImgSlider'} onClick={btnHandler}  className={'ms-3'}>Remove Image from the Slider</Button>
               <Button id={'up'} className={'ms-3'} onClick={btnHandler}>Update Image on the Banners </Button>
            </div>
            <div className={classes.formInputContainer}>
            {state === 'addImgSlider' && 
                <Form.Group>
                    <Form.Label>
                        Add Image to the Slider
                    </Form.Label>
                    <Form.Group>
                        <Form.Control ref={addImgRef} type='file'></Form.Control>
                    </Form.Group>
                    <Form.Label>
                        Link to the Product                        
                    </Form.Label>
                    <Form.Group>
                        <Select options={productOptions} onChange={(singleProduct)=>{
                            changeSingleProduct(singleProduct)
                        }}></Select>
                    </Form.Group>
                    <Button className={'mt-3'} onClick={addImgHandler}>Add Image</Button>
                </Form.Group>
            }
            {state === 'removeImgSlider' && 
                <Form.Group>
                    <Form.Label>
                        Remove Image From the Slider
                    </Form.Label>
                    <Container fluid className={classes.imgContainer}>
                        {images.map((singleItem, idx)=>{
                            console.log(idx)
                            return <div className={classes.imgChild}> <img src={singleItem.img}></img><p>{idx.toString()}</p> </div>
                        })}
                    </Container>
                    <Select onChange={(value)=>{
                        changeRemoveId(value.value)
                    }} className={'mt-3'} options={options}></Select>   
                    <Button className={'mt-3'} onClick={removeHandler}>Remove Image</Button>
                </Form.Group>
            }

            {state === 'up' && 
            <Form>
                <Form.Label>
                    Update the Banner
                </Form.Label>
                <Form.Control ref={updateImgRef} type='file'></Form.Control>
                
                <Form.Group className={'mt-3'}>
                <Form.Label>Image Number</Form.Label>
                <Select onChange={(value)=>{
                    changeUpdateId(value.value)
                }} options={options2}></Select>
                </Form.Group>
                
                <Button className={'mt-3'} onClick={updateHandler}>Update Image</Button>
            </Form>}
            </div>
        </div>
        </>}
        
        </>
    )
}

export default ImageCustomizer
import classes from './SingleProductStruct.module.css'
import {Form, Button} from 'react-bootstrap'
import Select from 'react-select'
import { useState, useEffect } from 'react'


const SingleProductStruct = ({secondDataArray, changeReloadState}) => {
    const [singleStruct, changeSingleStruct] = useState(false)
    const [newName, changeNewName] = useState('');
    
    console.log(singleStruct)

    const buttonHandler = () => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/editProductStruct`, {
            headers:{
                prev: singleStruct.label,
                latest:  newName.toUpperCase()
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response);
            changeReloadState((prevState)=>{
                return prevState + 1
            })
        })
    }

    return (
        <div className={classes.singleProduct}>
            <div className={'mt-3'}>
                    <h3>Edit Product Structure</h3>
                    <Form.Group className={'mt-2'}>
                        <Select options={secondDataArray} onChange={(value)=>{
                            changeSingleStruct(value)
                        }}></Select>
                    {singleStruct && <Form.Control value={newName} onChange={(event)=>{changeNewName(event.target.value)}} className={'mt-2'} placeholder={'New Name'}></Form.Control>}
                    {newName.length > 2 && <Button onClick={buttonHandler} className={'mt-3'}>Submit</Button>}
                    </Form.Group>
            </div>
        </div>
    )
}



export default SingleProductStruct
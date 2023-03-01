import { Form , Button, Modal, Spinner, InputGroup} from 'react-bootstrap'
import { useRef, useState } from 'react';
import classes from './AddSubAdmin.module.css'

const AddSubAdmin = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const phoneNumberRef = useRef();
    const emailRef = useRef();
    const cycleEdit = useRef();
    const couponEdit = useRef();
    const categoryEdit  =useRef();
    const brandEdit = useRef();
    const removeEdit = useRef();
    

    const [loading, changeLoading] = useState(false);


    const buttonHandler = () => {
        changeLoading(true);
        console.log('here');
        fetch(`${process.env.REACT_APP_FETCH_LINK}/addSubAdmin`, {
            headers: {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                phoneNumber: phoneNumberRef.current.value,
                email: emailRef.current.value,
                productEdit: cycleEdit.current.checked,
                categoryEdit: categoryEdit.current.checked,
                couponEdit: couponEdit.current.checked,
                brandEdit: brandEdit.current.checked,
                removeEdit: removeEdit.current.checked
            }
        }).then((response) => {
            return response.json();
        }).then((resp) => {
            console.log('here')
            changeLoading(false);
        })
    }


    if (loading) {
        return (
            <div>
                <Modal.Dialog>
                    <Modal.Body>
                        <Spinner animation="border" role="status">
                        </Spinner>
                    </Modal.Body>
                </Modal.Dialog>
            </div>
        )
    } else {
        return (
        <div>
            <Form.Group className="mb-3 mt-3">
                <Form.Label>Type in Username</Form.Label>
                <Form.Control type="text" ref={usernameRef} placeholder="Enter Name" />
                </Form.Group>
            <Form.Group className="mb-3 mt-3">
                <Form.Label>Type In Password</Form.Label>
                <Form.Control type="text" ref={passwordRef} placeholder="Enter Password" />
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
                <Form.Label>Enter The Phone Number</Form.Label>
                <Form.Control type="text" ref={phoneNumberRef} placeholder="Enter Phone Number" />
                </Form.Group>
            <Form.Group className="mb-3 mt-3">
                <Form.Label>Enter The Email of the SubAdmin</Form.Label>
                <Form.Control type="text" ref={emailRef} placeholder="Enter Email" />
                </Form.Group>
            <Form.Group>
                    <InputGroup>
                    <div className={classes.checkboxContainer}>
                        <div><input type='checkbox' ref={cycleEdit}></input><span>Add Products</span></div>        
                        <div><input type='checkbox' ref={couponEdit}></input><span>Coupon Edit</span></div>
                        <div><input type='checkbox' ref={categoryEdit}></input><span>Category Edit  </span></div>                
                        <div><input type='checkbox' ref={brandEdit}></input><span>Brand Edit</span></div>
                        <div><input type='checkbox' ref={removeEdit}></input><span>Remove Edit</span></div>
                    </div>
                    </InputGroup>
            </Form.Group>
            <Button onClick={buttonHandler}>Add the SubAdmin</Button>
        </div>
    )
    }
}

export default AddSubAdmin
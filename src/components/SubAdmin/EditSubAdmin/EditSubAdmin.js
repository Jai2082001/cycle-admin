import { Form, Button , Modal, Spinner, Alert} from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
const EditSubAdmin = ({ changeUpdate, subAdmins}) => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const phoneNumberRef = useRef();
    const emailRef = useRef();
    
    const [currentItem, changeCurrentItem] = useState(false);
    const [loading, changeLoading] = useState(false);
    const [afterMessage, changeAfterMessage] = useState(false);
    
    const buttonHandler = () => {
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/updateSubAdmin`, {
            headers: {
                originalusername: currentItem.username,
                username: usernameRef.current.value,
                password: passwordRef.current.value?passwordRef.current.value:currentItem.password,
                phonenumber: phoneNumberRef.current.value?phoneNumberRef.current.value:currentItem.phonenumber,
                email: emailRef.current.value?emailRef.current.value:currentItem.email
            }
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            changeAfterMessage(response.status);
            changeUpdate((prevState) => {
                return prevState + 1
            })
            changeLoading(false)
        })
    }

    return (
        <div>
            {loading && 
                <Modal.Dialog>
                    <Modal.Body>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Modal.Body>
                </Modal.Dialog>
            }

            {!loading && 
            <>
                <div className={'mt-2'}>
                    <Select options={subAdmins} onChange={ (value)=>{changeCurrentItem(value.value)} }></Select>
                </div>

                {currentItem &&
                    <div>
                    {afterMessage && <Alert variant='info' className={'mt-2 mb-2'}>{ afterMessage }</Alert>}
                    <Form.Group className="mb-3 mt-3">
                        <Form.Label>Type in Username</Form.Label>
                        <Form.Control type='text' value={currentItem.username} readOnly></Form.Control>
                        <Form.Control type="text" ref={usernameRef} placeholder="Enter Name" />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <Form.Label>Type In Password</Form.Label>
                        <Form.Control type='text' value={currentItem.password} readOnly></Form.Control>
                        <Form.Control type="text" ref={passwordRef} placeholder="Enter Password" />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <Form.Label>Enter The Phone Number</Form.Label>
                        <Form.Control type='text' value={currentItem.phonenumber} readOnly></Form.Control>
                        <Form.Control type="text" ref={phoneNumberRef} placeholder="Enter Phone Number" />
                        </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <Form.Label>Enter The Email of the SubAdmin</Form.Label>
                        <Form.Control type='text' value={currentItem.email} readOnly></Form.Control>
                        <Form.Control type="text" ref={emailRef} placeholder="Enter Email" />
                    </Form.Group>
                    <Button onClick={buttonHandler}>Add the SubAdmin</Button>
                    </div>
                }
                
            </>}
            
            
        </div>
    )
}

export default EditSubAdmin
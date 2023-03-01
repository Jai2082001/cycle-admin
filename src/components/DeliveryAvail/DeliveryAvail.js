import classes from './DeliveryAvail.module.css';
import {Form, Button, Alert} from 'react-bootstrap'
import { useRef, useState } from 'react';
const DeliveryAvail = () => {
    const pincodeRef = useRef();
    const [content, changeContent] = useState(false)
    const [alert, changeAlert] = useState(false);
    const findDistrict = (event) => {
        event.preventDefault();
        fetch(`https://api.postalpincode.in/pincode/${pincodeRef.current.value}`).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response)
            changeContent(response);
        })
    }

    const buttonHandler = () => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/locationAdd`, {
            headers: {
                pincode: pincodeRef.current.value,
                circle: content[0].PostOffice[0].Circle,
                division: content[0].PostOffice[0].Division,
                district: content[0].PostOffice[0].District,
                'addedBy': 'Admin'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            changeAlert(response);
        })
    }


    return (
        <div className={classes.parentDelContainer}>
            <Form>
                {alert && <Alert variant={alert.status === 'error' ? 'danger' : 'info'}>{ alert.message }</Alert>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter the Pincode where you can deliver</Form.Label>
                    <Form.Control ref={pincodeRef} type="number" placeholder="Enter Pincode" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Button onClick={findDistrict} variant="primary" type="submit">
                    Find the District
                </Button>

                {content && 
                <div className='mt-3'>
                    <Form.Control type="text" placeholder={`Circle- ${content[0].PostOffice[0].Circle}`} readOnly />
                    <Form.Control type="text" className={'mt-2'} placeholder={`District- ${content[0].PostOffice[0].District}`} readOnly />
                    <Form.Control type="text" className={'mt-2'} placeholder={`Division- ${content[0].PostOffice[0].Division}`} readOnly />
                    <Button className="mt-2" onClick={buttonHandler}>Store Location</Button>
                </div>
                }
                
            </Form>
        </div>
    )
}

export default DeliveryAvail
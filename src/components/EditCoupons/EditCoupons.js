import {Form, Button, ButtonGroup, Alert, Spinner} from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'


const EditCoupons = () => {

    const [action, changeAction] = useState('add');
    const [msg, changeMsg] = useState('');
    const [loading, changeLoading] = useState(false);
    const [dataArray, changeDataArray] = useState([]);
    const couponRef = useRef();
    const priceRef = useRef();


    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/couponDisplay`).then((response) => {
            return response.json()
        }).then((response) => {
            changeDataArray(response);
        })
    }, [])

    const buttonHandler = (event) => {
        changeLoading(true)
        event.preventDefault();
        console.log(event.target.id);
        let uri;
        if (event.target.id === 'add') {
            uri = 'couponAdd';
        } else if (event.target.id === 'remove') {
            uri = 'couponRemove';
        } else if (event.target.id === 'edit') {
            uri = 'couponEdit';
        } else {
            return
        }
        if (uri === 'couponRemove') {
            fetch(`${process.env.REACT_APP_FETCH_LINK}/${uri}`, {
                headers: {
                    code: couponRef.current.value,
                }
            }).then((response) => {
                return response.json();
            }).then((response) => {
                if (response.status) {
                    changeMsg({ msg: response.status, nature: 'error' })
                } else {
                    changeMsg({ msg: 'Action Done Successfully', nature: 'success' })
                }
                    changeLoading(false)

            })
        }
        else {
            fetch(`${process.env.REACT_APP_FETCH_LINK}/${uri}`, {
                headers: {
                    code: couponRef.current.value,
                    price: priceRef.current.value,
                    "addedBy": 'Admin'
                }
            }).then((response) => {
                return response.json();
            }).then((response) => {
                if (response.status) {
                    changeMsg({ msg: response.status, nature: 'error' })
                } else {
                    changeMsg({ msg: 'Action Done Successfully', nature: 'success' })
                }
                    changeLoading(false)
                
            })
        }
    }

    return (
        <div className={'mt-2'}>
            <ButtonGroup>
            <Button onClick={()=>{changeAction('add')}}>Add Coupon Code</Button>
            <Button className={'ms-2'} onClick={()=>{changeAction('edit')}}>Edit Coupon Code</Button>    
            <Button className={'ms-2'} onClick={()=>{changeAction('remove')}}>Remove Coupon Code</Button>
            </ButtonGroup>
            {action === 'add' &&
                <>
                <Form className={'mt-2'}>
                    <Form.Group className="mb-3" controlId="formBasicCoupon">
                        <Form.Label>Coupon Code</Form.Label>
                        <Form.Control ref={couponRef} type="text" placeholder="Enter Coupon Code You Want To Create" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Less In Percentage</Form.Label>
                        <Form.Control  min={'1'}  ref={priceRef} type="number" placeholder="Enter the Percentage" />
                    </Form.Group>
                    <Button variant="primary" type="submit" id={'add'} onClick={buttonHandler}>
                        {loading && <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>}
                        {!loading && 'Add The Coupon Code'}
                    </Button>                    
                </Form>
                </>
            }
            {action === 'remove' && 
                <>
                <div className={'mt-2'}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicCouponCode ">
                        <Form.Label>Remove Coupon Code</Form.Label>
                        <Form.Control ref={couponRef} type="text" placeholder="Enter Coupon Code You Want To Remove" />
                        </Form.Group>
                        <Button variant="primary" type="submit" id={'remove'} onClick={buttonHandler}>
                            {loading && <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>}
                        {!loading && 'Remove Coupon Code'}
                        </Button>
                    </Form>    
                </div>
                </>
            }
            {
                action === 'edit' &&
                <div className={'mt-3'}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicCouponCode ">
                        <Form.Label>Enter Coupon Code</Form.Label>
                        <Form.Control ref={couponRef} type="text" placeholder="Enter Coupon Code You Want To Edit" />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>New Percentage You Want To Add</Form.Label>
                            <Form.Control min={'1'}   ref={priceRef} type='number' placeholder='Enter the New Percentage'></Form.Control>
                        </Form.Group>
                        <Button  variant="primary" type="submit" id={'edit'} onClick={buttonHandler}>
                            {loading && <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>}
                        {!loading && 'Edit Coupon Code '}
                        </Button>
                    </Form>
                </div>
            }

            {msg && msg.nature === 'error' && <Alert variant='danger' className='mt-3'>{ msg.msg }</Alert>}
            {msg && msg.nature === 'success' && <Alert variant='info' className='mt-3'>{ msg.msg }</Alert>}

        </div>
    )
}

export default EditCoupons
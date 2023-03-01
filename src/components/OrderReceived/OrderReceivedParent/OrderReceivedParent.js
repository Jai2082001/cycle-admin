import classes from './OrderReceivedParent.module.css'
import { Alert, Table } from 'react-bootstrap'
import CartElement from "../CartElement/CartElement"
import AddressElement from "../AddressElement/AddressElement"
import { Button, Form } from "react-bootstrap";
import { useRef } from 'react';

const OrderReceivedParent = ({ idx, itemSingle, acceptHandler, rejectHandler }) => {
    
    const lengthRef = useRef();
    const widthRef = useRef();
    const weightRef = useRef();
    const heightRef = useRef();

    return (
        <>
            <tr className={classes.infoDiv}>
                <td>{idx}</td>
                <td>{itemSingle.name}</td>
                <td>{<AddressElement address={itemSingle.address}></AddressElement>}</td>
                <td><CartElement cart={itemSingle.cart}></CartElement></td>
                <td><div><Button onClick={() => { acceptHandler(itemSingle, lengthRef.current.value, widthRef.current.value, weightRef.current.value, heightRef.current.value) }}>Accept</Button><Button className={'ms-2 mt-2'} onClick={() => { rejectHandler(itemSingle) }}>Reject</Button></div></td>
            </tr>
            <tr className={classes.packDiv}>
                <td>
                    <Form.Control placeholder="Enter Length of the package" ref={lengthRef} type='number'></Form.Control>
                </td>
                <td>
                    <Form.Control placeholder="Enter Width of the package" ref={widthRef} type='number'></Form.Control>
                </td>
                <td>
                    <Form.Control placeholder="Enter Height of the package" ref={heightRef} type='number'></Form.Control>
                </td>
                <td>
                    <Form.Control placeholder="Enter Weight of the package" ref={weightRef} type='number'></Form.Control>
                </td>
            </tr>
        </>
    )
}

export default OrderReceivedParent
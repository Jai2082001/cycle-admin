import {useEffect, useState, useRef} from 'react'
import { Alert, Table } from 'react-bootstrap'
import CartElement from "./CartElement/CartElement"
import AddressElement from "./AddressElement/AddressElement"
import { Button, Form } from "react-bootstrap";
import classes from './OrderReceived.module.css'
import OrderReceivedParent from './OrderReceivedParent/OrderReceivedParent';


const OrderReceived = () => {
    
    const [products, changeProducts] = useState([])
    const[outerState, changeOuterState] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/orderReceived`).then((response) => {
            return response.json()
        }).then((response)=>{
            changeProducts(response)
        })    
    }, [outerState])

    const acceptHandler = (cartItem, length, width, weight, height) => {
        alert('Action done')
        console.log(length);
        console.log(width);
        console.log(weight);
        console.log(height);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/orderAccept`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "length": length,
                "width": width,
                "weight": weight,
                "height": height   
            },
            body: JSON.stringify(cartItem)
        }).then((response) => {
            return response.json()
        }).then((response) => {
            if (response.status === 'ok') {
                changeOuterState((prevState) => {
                    return prevState + 1
                })
            }
        })
    }

    const rejectHandler = (cartItem) => {
        alert('Action Done')
        fetch(`${process.env.REACT_APP_FETCH_LINK}/orderReject`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartItem)
        }).then((response) => {
            return response.json()
        }).then((response) => {
            if (response.status === 'ok') {
                changeOuterState((prevState) => {
                    return prevState + 1
                })
            }
        })
    }

    return (
        <div>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <tr>Serial Number</tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Cart</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((itemSingle, idx) => {               
                        return (
                            <>
                            <OrderReceivedParent idx={idx+1} itemSingle={itemSingle} acceptHandler={acceptHandler} rejectHandler={rejectHandler}></OrderReceivedParent>
                            </>
                        )
                    })}                    
                    </tbody>
                </Table>
            </div>
            
        </div>
    )
}

export default OrderReceived
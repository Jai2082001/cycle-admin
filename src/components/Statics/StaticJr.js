import { useState } from "react"
import Address from "./Address"


const StaticJr = ({ info, index }) => {

    const [click, changeClick] = useState(false)

    const displayHandler = () => {
        changeClick((prevState) => {
            return !prevState
        })
    }

    return (
        <>
            <tr onClick={displayHandler}>
                <td>{index + 1}</td>
                <td>{info.name}</td>
                <td>{info.number}</td>
                <td>{info.email}</td>
            </tr>
            {click &&
                <>
                <p>{index + 1 }</p>
                <p>Cart</p> 
                {info.cart && info.cart.map((singleItem)=>{
                    return(
                        <div>
                            <span>Name:- {singleItem.product.name}</span>
                            <span>Quantity Selected by Consumer:- {singleItem.quantity}</span> 
                            {singleItem.product['wheel size'] && <span>Wheel Size:- {singleItem.product['wheel size']}</span>}
                        </div>
                    )
                })}                
                {info.address && 
                <>
                    <p className={'mt-2'}>Address</p>
                    <Address address={info.address}></Address>
                </>}
            </>}

        </>
    )
}

export default StaticJr
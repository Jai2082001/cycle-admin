import { useEffect } from "react"
import { useState } from "react"
import { Spinner } from "react-bootstrap";


const Address = ({address}) => {
    
    const [loading, changeLoading] = useState(false)
    const [address1, changeAddress1] = useState(false);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_FETCH_LINK}/addressDisplay`, {
            headers: {
                address: address
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            changeAddress1(response);
        })
    }, [])
    
    return (
        <>
            {!address1 && <Spinner animation='border'></Spinner>}
            {address1 && 
            <p>
                {address1.address} {address1.city} {address1.state}
            </p>}
        </>
    )
}

export default Address
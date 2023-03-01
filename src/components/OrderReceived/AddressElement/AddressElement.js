import {useState, useEffect} from 'react'
import { Spinner } from 'react-bootstrap'


const AddressElement = ({ address }) => {
    
    const [loading, changeLoading] = useState(false)
    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/addressDisplay`, {
            headers: {
                address: address
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response) 
            changeLoading(response)
        })
    }, [])

    console.log(loading)

    return (
        <div>
            {!loading && <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>}
            {loading.status === 'Not available' && <span>{'Not Available'}</span>}

            {loading && loading.status !== 'Not available'  && <span>{`${loading.fullname} ${loading.address} ${loading.state} ${loading.city} ${loading.pincode} ${loading.number} ${loading.alternatenum}`}</span>}
        </div>
    )
}

export default AddressElement
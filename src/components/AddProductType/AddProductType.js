import {Form, Button, Spinner} from 'react-bootstrap'
import {useState, useRef} from 'react'


const AddProductType = () => {

    const inputRef = useRef();
    const [loading, changeLoading] = useState(false)
    const buttonHandler = (event) => {
        event.preventDefault();
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/addProductType`, {
            headers: {
                name: inputRef.current.value
            }
        }).then((response)=>{
            return response.json();
        }).then((response)=>{
            console.log(response);
            changeLoading(false)
        })
    }
    return (
        <div>
            <Form className={'mt-2 ms-2'}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Add the Product Type</Form.Label>
                <Form.Control ref={inputRef}  placeholder="Enter Product Type" />
            </Form.Group>
            <Button onClick={buttonHandler} variant="primary" type="submit">
                {!loading && 'Submit the Category'}
                    {loading && <Spinner animation="border" role="status"></Spinner>}
            </Button>
            </Form>
        </div>
    )
}

export default AddProductType
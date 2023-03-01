import { Form, Button, FormControl } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { ButtonGroup, Spinner, Alert} from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';

const Admin = ({ changeUser, changeSecured }) => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [loading, changeLoading] = useState(false);
    const [error, changeError] = useState(false);
    const [cookies, setCookie] = useCookies(['auth']);
    const [password, changePassword] = useState(false);
    const mouseDownHandler = () => {
        changePassword(true)
    }
    const mouseUpHandler = () => {
        changePassword(false)
    }

    const subAdminHandler = () => {
        changeUser({post: 'subadmin'})
    }
    
    const buttonHandler = (event) => {
        event.preventDefault();
        changeLoading(true);
        if (usernameRef.current.value === 'Admin' && passwordRef.current.value === "mtb@123") {
            console.log('hello');
            setCookie('authenticated', true, { path: '/' });
            changeSecured(true)
        }
        else {
            changeError(true)
        }
        changeLoading(false)
    }

    return (
        <div>
            {error &&
             <Alert variant='danger'>{ 'Username and Pasword are not correct' }</Alert> }
                <h2>Admin</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control ref={ usernameRef } type="text" placeholder="Enter Username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3">
                        <FormControl ref={passwordRef} type={ password?"text":"password" } placeholder="Password" />
                        <InputGroup.Text onMouseDown={mouseDownHandler} onMouseUp={ mouseUpHandler }><i className="far fa-eye"></i></InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                    <ButtonGroup>    
                        <Button variant="primary" type="submit" onClick={buttonHandler}>
                            Login
                        </Button>
                            
                    </ButtonGroup>

                        {/* {!loading &&
                        <ButtonGroup>    
                            <Button onClick={buttonHandler} variant="primary" type="submit">
                            Login
                            </Button>
                            <Button onClick={subAdminHandler} className={'ms-3'}>
                            Login For SubAdmin    
                            </Button>        
                        </ButtonGroup>} */}

                    {loading&&<Button variant="primary" disabled>
                        <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                        Loading...
                    </Button>}
                </Form>
                </div>
    )
}

export default Admin
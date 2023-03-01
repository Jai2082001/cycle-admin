import classes from './Login.module.css';
import { Form, Button, FormControl, InputGroup, Spinner, Alert, ButtonGroup } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import Admin from './Admin/Admin';

const Login = ({ changeSecured, secured, user, changeUser }) => {

    console.log(secured)
    const [cookies, setCookies, removeCookies] = useCookies(['authenticated']);
    if (cookies['authenticated']) {
        changeSecured(true)
    }
    if (secured) {
        return(
            <Redirect to='/adminPanel'></Redirect>
        )
    }

    return (
        <>
            <div className={classes.parentDiv}>
                <Admin changeSecured={changeSecured} changeUser={changeUser}></Admin>
            </div>
        </>
    )
    
}

export default Login
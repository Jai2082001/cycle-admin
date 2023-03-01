import classes from './SubAdmin.module.css'
import { ButtonGroup, Button } from 'react-bootstrap'
import { useState } from 'react'
import SubAdminDiv from './SubAdminDiv/SubAdminDiv';


const SubAdmin = () => {

    const [pageSubAdmin, changeSubAdmin] = useState('add');

    return (
        <div className={classes.subAdminDiv}>
            <ButtonGroup className={'mt-2'}>
                <Button onClick={()=>{changeSubAdmin('add')}}>Add Sub Admin</Button>
                <Button onClick={()=>{changeSubAdmin('remove')}}className={'ms-2'}>Remove Sub Admin</Button>
                <Button onClick={()=>{changeSubAdmin('edit')}}className={'ms-2'}>Edit Sub Admin</Button>
            </ButtonGroup>
            <SubAdminDiv page={pageSubAdmin}></SubAdminDiv>
        </div>
    )
}

export default SubAdmin
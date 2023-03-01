import {Form} from 'react-bootstrap'
import classes from './SubAdminDiv.module.css'
import { useEffect, useState } from 'react'
import AddSubAdmin from '../AddSubAdmin/AddSubAdmin'
import RemoveSubAdmin from '../RemoveSubAdmin/RemoveSubAdmin';
import EditSubAdmin from '../EditSubAdmin/EditSubAdmin';
    
const SubAdminDiv = ({ page }) => {

    const [updation, changeUpdation] = useState(0);
    const [subAdmins, changeSubAdmins] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/getSubAdmin`).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response);
            console.log(response)
            let admins = response;
            if (response) {              
                admins = admins.map((item) => {
                return {label: item.username, value: item}
                })      
            }
            
            changeSubAdmins(admins)
        })
    }, [updation, page])


    return (
        <div className={classes.subAdminDiv}>
            {page === 'add' &&
                <AddSubAdmin></AddSubAdmin>
            }
            
            {page === 'remove' &&
            <div>
                <RemoveSubAdmin subAdmins={subAdmins}  changeUpdate={changeUpdation}></RemoveSubAdmin>    
            </div>}
            
            {page === 'edit' &&
            <div>
                <EditSubAdmin subAdmins={subAdmins}  changeUpdate={changeUpdation}></EditSubAdmin>
            </div>
            }
        </div>
    )
}

export default SubAdminDiv
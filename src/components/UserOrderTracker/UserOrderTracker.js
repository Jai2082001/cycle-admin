import classes from './UserOrderTracker.module.css'
import {Form, Table} from 'react-bootstrap'

const UserOrderTracker = () => {
    return (
        <div className='mt-2'>
            
            <Form.Control placeholder="Filter The Order" />
            <Table striped bordered hover className='mt-2'>
                <thead>
                    <tr>
                    <th>Order id</th>
                    <th>User_Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Cancel Button</th>    
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    {/* <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td> */}
                    </tr>
                </tbody>
            </Table>

                        </div>
    )
}

export default UserOrderTracker
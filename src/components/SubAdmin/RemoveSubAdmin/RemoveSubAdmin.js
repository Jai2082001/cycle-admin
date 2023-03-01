import Select from 'react-select';
import { useEffect, useState } from 'react';
import { Modal, Spinner, Alert} from 'react-bootstrap';

const RemoveSubAdmin = ({ changeUpdate, subAdmins }) => {
    const [loading, changeLoading] = useState(false);
    const [afterMessage, changeAfterMessage] = useState('');

    console.log(subAdmins);

    const removeHandler = (value) => {
        changeLoading(true);
        changeAfterMessage(false);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/deleteSubAdmin`, {
            headers: {
                username: value.value.username
            }
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            changeAfterMessage(response.status)
            changeLoading(false);
            changeUpdate((prevState) => {
                console.log('hereyes');
                return prevState + 1
            })
        })
    }

    return (
        <>
           {loading && <div>
                <Modal.Dialog>
                    <Modal.Body>
                        <Spinner animation={'border'}></Spinner>
                    </Modal.Body>
                </Modal.Dialog>
            </div>}

            {!loading &&
            <div className={'mt-2'}>
            <Select options={subAdmins} onChange={
                (value) => {
                    removeHandler(value)
                }
            }></Select>
            <div className={'mt-3'}>
                {afterMessage && <Alert variant='info'>{ afterMessage }</Alert>}
            </div>
            </div>
            }
        </>    
    )
   
}

export default RemoveSubAdmin
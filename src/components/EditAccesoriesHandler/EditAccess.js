import classes from './EditAccess.module.css';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { useEffect, useState } from 'react';
const EditAccess = () => {
    const [access, changeAccess] = useState([]);
    const [selected, changeSelected] = useState(false);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/accessoryDis`).then((response) => {
            return response.json();
        }).then((response) => {
            let array = response.map((item) => {
                return {label: item.accessory, value: item}
            })
            changeAccess(array);
        })
    }, [])
     let riderOption = [
        { label: 'Backpacks', value: 'Backpacks' },
        { label: 'Compression and Inner Wear', value: 'Compression and Inner Wear' },
        { label: 'Eyewear', value: 'Eyewear' },
        {label: 'Face Masks', value: 'Face Masks'},
        { label: 'Footwear', value: 'Footwear' },
        { label: 'Gloves', value: 'Gloves' },
        { label: 'Helmets', value: 'Helmets' },
        { label: 'Jerseys', value: 'Jerseys' },
        { label: 'Recovery and Body Care', value: 'Recovery and Body Care' },
        { label: 'Shorts', value: 'Shorts' },
        {label: 'T-Shirts', value: 'T-Shirts'}
    ]
    let cycleOptions = [
        { label: 'Bags and Car Racks', value: 'Bags and Car Racks' },
        { label: 'Bells and Horns', value: 'Bells and Horns' },
        { label: 'Bottles and Bottle Cages', value: 'Bottles and Bottle Cages' },
        { label: 'Components and Spares', value: 'Components and Spares' },
        { label: 'GPS and Cyclocomputers', value: 'GPS and Cyclocomputers' },
        { label: "Lights", value: 'Lights' },
        { label: "Locks", value: "Locks" },
        { label: "Maintenance and Care", value: 'Maintenance and Care' },
        { label: "Mudguards and Protection", value: "Mudguards and Protection" },
        { label: 'Others', value: 'Other' },
        { label: 'Pumps', value: 'Pumps' },
        { label: 'Stands', value: 'Stands' },
        { label: 'Tires and Tubes', value: 'Tires and Tubes' },
        { label: 'Tools', value: 'Tools' },
        { label: 'Trainers', value: 'Trainers' },
        { label: 'Wheels', value: 'Wheels' }

    ]


    let options = [
        { label: 'Rider', value: 'Rider' },
        {label: 'Cycle', value: 'Cycle'}
    ]
    
    console.log(selected)
    return (
        <div className={'mt-3'}>
            <Form>
                <Select options={access} onChange={(value) => {
                    let productPrev = value.value;
                if (productPrev.type === 'Rider') {
                    productPrev.riderType = { label: productPrev.riderType, value: productPrev.riderType };
                } else {
                    productPrev.cycleType = { label: productPrev.cycleType, value: productPrev.cycleType };    
                }  
                productPrev.type = { label: productPrev.type, value: productPrev.type }
                  
                changeSelected(productPrev); }}></Select>
                {selected &&
                    <>
                <Form.Group className="mb-3 mt-3" >
                    <Form.Label>Accessory Type</Form.Label>
                        <Select options={options} defaultValue={selected.type} onChange={(value) => {
                            console.log(value);
                            let productPrev = selected;
                            productPrev.type = value;
                            console.log(productPrev)
                            changeSelected(productPrev);
                        }}></Select>
                    {selected.type.label === 'Rider' && <Select options
                            ={riderOption} defaultValue={selected.riderType} onChange={(value) => {
                                let productPrev = selected;
                                productPrev.riderType = value;
                                changeSelected(productPrev);
                            }}></Select>}
                    {selected.type.label === 'Cycle' && <Select options
                            ={cycleOptions} defaultValue={selected.cycleType} onChange={(value) => {
                                let productPrev = selected;
                                productPrev.cycleType = value;
                                changeSelected(productPrev);
                    }}></Select>}        
                </Form.Group>
                
                    
                <Form.Group className="mb-3 mt-3" >
                    <Form.Label>Accessory Name</Form.Label>
                        <Form.Control type="text" placeholder={ selected.accessory } readOnly/>
                    <Form.Control type="text" placeholder="Accessory Name" />
                    </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Accessory Price</Form.Label>
                    <Form.Control type="text" placeholder={selected.price} readOnly />
                    <Form.Control type="text" placeholder="Accessory Price" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Accessory Overprice</Form.Label>
                    <Form.Control type="text" placeholder={selected.overprice} readOnly />
                    <Form.Control type="text" placeholder="Accessory Overprice" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Accessory Description </Form.Label>
                    <Form.Control type="text" placeholder={selected.desc}  readOnly/>
                    <Form.Control type="text" placeholder="Accessory Description" />
                </Form.Group>

            
                
                {/* <Form.Group className="mb-3" >
                    <Form.Label>Coupons Applicable</Form.Label>
                    <Form.Control type="text" placeholder={} />    
                    <Form.Control type="text" placeholcder="Coupons Applicable" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Accessory Name</Form.Label>
                    <Form.Control type="text" placeholder={} />    
                    <Form.Control type="text" placeholder="Accessory Name" />
                </Form.Group> */}
                    
                </>}
                
                

            </Form>
        </div>    
    )
}

export default EditAccess
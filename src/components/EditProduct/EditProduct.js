import { Form , Button, Modal, ModalBody, Spinner, Alert} from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import Select from 'react-select';

const EditProduct = () => {
    
    const [product, changeProduct] = useState([]);
    const [singleProduct, changeSingleProduct] = useState(false);
    const [coupons, changeCoupons] = useState(false);
    const [category, changeCategory] = useState(false);
    const [modalLoading, changeModalLoading] = useState(false);
    const [added, setAdded] = useState(false);
    const [quantityState, setQuantityState] = useState(false);
    const [accessCatState, setAccessCatState] = useState(false);
    const [riderState, changeRiderState] = useState(false);
    const [cycleState, changeCycleState] = useState(false)
    const overPriceRef = useRef();
    const gearRef = useRef();
    const tireRef = useRef();
    const frontRef = useRef();
    const rearRef = useRef();
    const weightRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const descRef = useRef();
    const quantity = useRef();
    const descPoint1 = useRef();
    const descPoint2 = useRef();
    const descPoint3 = useRef();
    const descPoint4 = useRef();
    const quantityType = useRef();
    const suspensionRef = useRef();
    const frameRef = useRef();
    const brakeRef = useRef();


    useEffect(() => {
        changeModalLoading(true);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/productDisplayWhole`).then((res) => {
            return res.json()
        }).then((response) => {
            console.log(response)
            const array = response.map((item) => {
                return { label: item.name, value: item }
            })
            changeProduct(array);
            fetch(`${process.env.REACT_APP_FETCH_LINK}/couponDisplay`).then((response) => {
                return response.json();
            }).then((response) => {
                const array = response.map((item) => {
                    return { label: item.code, value: item }
                })
                changeCoupons(array);                
                fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryDisplay`).then((response) => {
                    return response.json();
                }).then((response) => {
                    const array = response.map((item) => {
                        return { label: item.name, value: item }
                    })
                    changeCategory(array);
                    changeModalLoading(false);
                })
            })
        })
    }, [])

    const stockType = [
        { label: 'In Stock', value: true },
        { label: 'Out of Stock', value: false }
    ]

    console.log(singleProduct);

    const productSelector = (value) => {
        changeModalLoading(true)
        setTimeout(() => {
            changeSingleProduct(value.value)
            changeModalLoading(false);
            setAdded(false)
        }, 2000);
    }
        const userTypes = [
    { label: "Male", value: 'm' },
    { label: "Female", value: 'f' },
    { label: "Young Male", value: 'ym' },
    {label: "Young Female", value: 'yf'}
    ];

    const emiAvailability = [
        { label: 'Yes', value: true },
        {label: 'No', value: false}
    ]

    console.log(singleProduct)

    const submitHandler = () => {
        changeModalLoading(true);
        console.log(singleProduct)
        
        if (singleProduct)
        {
                    // id: singleProduct._id,
                    // name: nameRef.current.value?nameRef.current.value:singleProduct.name,
                    // overprice: overPriceRef.current.value?overPriceRef.current.value:singleProduct.overprice,
                    // price: priceRef.current.value ? priceRef.current.value : singleProduct.price,
                    // desc: descRef.current.value ? descRef.current.value : singleProduct.desc,
                    // type: singleProduct.type,
                    // category: singleProduct.category,
                    // coupon: singleProduct.coupon,
                    // stock: singleProduct.stock,
                    // emi: singleProduct.emi,
                    // suspensionRef: suspensionRef.current.value ? suspensionRef.current.value : singleProduct.suspension,
                    // weight: weightRef.current.value ? weightRef.current.value : singleProduct.weight,
                    // rear: rearRef.current.value ? rearRef.current.value : singleProduct['rear deraileur'],
                    // front: frontRef.current.value ? frontRef.current.value : singleProduct['front deraileur'],
                    // gear: gearRef.current.value? gearRef.current.value: singleProduct['no. of gears'],
                    // wheel: tireRef.current.value?tireRef.current.value: singleProduct['wheel size'],
                    // quantity: quantity.current.value ? quantity.current.value : singleProduct.quantity,
            
            let dataObj = {}
            dataObj = {
                id: singleProduct._id,
                name: nameRef.current.value?nameRef.current.value : singleProduct.name,
                overprice: overPriceRef.current.value?overPriceRef.current.value:singleProduct.overprice,
                price: priceRef.current.value ? priceRef.current.value : singleProduct.price,
                desc: descRef.current.value ? descRef.current.value : singleProduct.desc,
                categories: singleProduct.categories,
                stock: singleProduct.stock,
                coupon: singleProduct.coupon,
                emi: singleProduct.emi,
                quantity: quantity.current.value?quantity.current.value:singleProduct.quantity,
                category: singleProduct.category,
                brand: singleProduct.brand
            }
            if(singleProduct.categories === 'Cycle'){

                console.log(!!weightRef.current.value)
                console.log(singleProduct.weight)
                dataObj.brakes = brakeRef.current.value ? brakeRef.current.value : singleProduct.brakes
                dataObj.weight = weightRef.current.value ? weightRef.current.value : singleProduct.weight;
                dataObj.suspension = suspensionRef.current.value ? suspensionRef.current.value : singleProduct.suspension;
                dataObj.rear = rearRef.current.value ? rearRef.current.value : singleProduct['rear deraileur'];
                dataObj.front = frontRef.current.value ? frontRef.current.value : singleProduct['front deraileur'];
                dataObj.gear = gearRef.current.value ? gearRef.current.value: singleProduct['no. of gears'];
                dataObj.wheel = tireRef.current.value ? tireRef.current.value: singleProduct['wheel size'];
                dataObj.userType = singleProduct.userType;
                dataObj.frame = frameRef.current.value ? frameRef.current.value : singleProduct['frame material']
            }
            else if(singleProduct.categories === 'access'){
                dataObj.descPoint1 = descPoint1.current.value ? descPoint1.current.value : singleProduct.descPoint1;
                dataObj.descPoint2 = descPoint2.current.value ? descPoint2.current.value : singleProduct.descPoint2;
                dataObj.descPoint3 = descPoint3.current.value ? descPoint3.current.value : singleProduct.descPoint3;
                dataObj.descPoint4 = descPoint4.current.value ? descPoint4.current.value : singleProduct.descPoint4;
                dataObj.riderType = singleProduct.riderType;
                dataObj.cycleType = singleProduct.cycleType;
                dataObj.forProduct = singleProduct.forProduct;
            }
            else{
                dataObj.descPoint1 = descPoint1.current.value ? descPoint1.current.value : singleProduct.descPoint1;
                dataObj.descPoint2 = descPoint2.current.value ? descPoint2.current.value : singleProduct.descPoint2;
                dataObj.descPoint3 = descPoint3.current.value ? descPoint3.current.value : singleProduct.descPoint3;
                dataObj.descPoint4 = descPoint4.current.value ? descPoint4.current.value : singleProduct.descPoint4;
            }

            fetch(`${process.env.REACT_APP_FETCH_LINK}/updateProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    product: singleProduct.categories
                },
                body: JSON.stringify(dataObj)
            }).then((response) => {
                return response.json();
            }).then((response) => {
                console.log(response)
                if (response.status) {
                    setAdded({ nature: 'error', msg: response.status });
                } else {
                    setAdded({ nature: 'success', msg: 'Edited in the database' });
                }
                changeModalLoading(false)
            })
        } else {
            changeModalLoading(false)
            return 
        }
    }
    let productType = [
        {label: 'Rider', value: 'r'},
        {label: 'Cycle', value: 'c'}
    ]

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
    return (
        <>
            {(added && added.nature === 'error') && <Alert variant='danger'>{added.msg}</Alert>}
            {(added && added.nature === 'success') && <Alert variant='info'>{ added.msg }</Alert>}
            

            <Modal show={modalLoading} background='static' keyboard={false}>
                <ModalBody>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner> 
                </ModalBody>
            </Modal>
            
            <Alert variant='secondary' className='mt-3 mb-3'>Dont Leave Any Field Unattended</Alert>
            
            <div>
                { !modalLoading && <><Form.Group className="mb-3 mt-3">
                <Form.Label>Select Product</Form.Label>
                    <Select defaultValue={singleProduct.name} options={product} onChange={(value) => {productSelector(value) } }></Select>
            </Form.Group>

           
            {singleProduct && 
                <Form.Group>
                    <Form.Label>Product Parent Categories</Form.Label>
                    <Form.Control type='text' readOnly placeholder={singleProduct.categories}></Form.Control>
                </Form.Group>}
                
            <Form.Group className="mb-3 mt-3">
                { singleProduct && <> <Form.Label>Product Name</Form.Label> <Form.Control type="text"   readOnly placeholder={singleProduct.name} /> 
                <Form.Control ref={nameRef} placeholder={'Edit the Name'} className={'mt-2'}></Form.Control></>}
            </Form.Group>
                    
            <Form.Group className="mb-3">
            {singleProduct &&<><Form.Label>Overprice</Form.Label>
                <Form.Control type="number" min="0"  readOnly  placeholder={singleProduct.overprice} />
                <Form.Control ref={overPriceRef} placeholder={'Edit the Overprice'} className={'mt-2'}></Form.Control></>}
            </Form.Group>
                
            <Form.Group className="mb-3">
               
                {singleProduct && <>  <Form.Label>Product Price</Form.Label><Form.Control type="number" min="1"  readOnly   placeholder={singleProduct.price} />
                <Form.Control ref={priceRef} placeholder={'Edit the price'} className={'mt-2'}></Form.Control></>}
            </Form.Group>
                
            <Form.Group className="mb-3">
               
                {singleProduct &&<> <Form.Label>Product Description</Form.Label>  <Form.Control type="text"  readOnly placeholder={singleProduct.desc} />
                <Form.Control ref={descRef} placeholder={'Edit the Description'} className={'mt-2'}></Form.Control></>}
            </Form.Group>

            <Form.Group className="mb-3">
                
                {singleProduct && <>
                <Form.Label>EMI Available</Form.Label>
                    <Form.Control type="text" readOnly placeholder={singleProduct.emi.toString()} />
                    <Select options={emiAvailability} onChange={(value) => {
                        let productPrev = singleProduct;
                        productPrev.emi = value.label;
                        changeSingleProduct(productPrev)        
                    }}>       
                    </Select>
                            
                </>
                }
            </Form.Group>
                    

               {quantityState &&
                <>

                <Form.Group className='mb-3'>
                    <Form.Label>Product Quantity</Form.Label>
                    <Form.Control readOnly type='number' ref={quantity} value='0' placeholder='Enter Product Quantity'></Form.Control>
                        </Form.Group>
                </>
                }
                {
                !quantityState && singleProduct &&
                <>
                    <Form.Group className='mb-3'>
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control type='number' className='mb-2' readonly value={singleProduct.quantity}></Form.Control>
                            <Form.Control type='number' ref={quantity}  placeholder='Enter Product Quantity'></Form.Control>
                    </Form.Group>
                </>
            }

            {singleProduct && 
            <Form.Group className="mb-3">
                <>
                    <Form.Label>Quantity Type</Form.Label>
                    <Select options={stockType} onChange={(value) => {
                        let productPrev = singleProduct;
                        if (value.value) {
                            setQuantityState(false);    
                        } else {
                            setQuantityState(true);
                        }
                        productPrev.stock = value.label;
                        changeSingleProduct(productPrev)
                    }}></Select>                        
                </>            
            </Form.Group>
            }                
            
            {
                singleProduct &&
                <Form.Group className="mb-3">
                {singleProduct && <>
                <Form.Label>Coupons Associated</Form.Label>
                 <Select isMulti={true} options={coupons} onChange={(value)=>{
                    let prevProduct = singleProduct;
                    prevProduct.coupon = value;
                    changeSingleProduct(prevProduct)
                }} defaultValue={singleProduct.coupon}></Select></>}                
            </Form.Group> 
            }

        {singleProduct && singleProduct.categories !== 'Cycle' && 
        <>

        {singleProduct.categories === 'access' && 
        <>
            <Form.Group className={'mb-3'}>
                <Form.Label>Update Accessory Category</Form.Label>
                <Select options={productType} onChange={(value)=>{
                    setAccessCatState(value.label)
                    const productPrev = singleProduct;
                    productPrev.forProduct = value.label;
                    changeSingleProduct(productPrev)
                }} ></Select>
            </Form.Group>
            
            {accessCatState && 
            <Form.Group className={'mb-3'}>
                <Form.Label>Update {accessCatState} Value</Form.Label>
                {accessCatState === 'Rider' && <Select onChange={(value)=>{
                    const productPrev = singleProduct;
                    productPrev.riderType = value.label;
                    changeSingleProduct(productPrev)
                }} options={riderOption}></Select>}
                {accessCatState === 'Cycle' && <Select onChange={(value)=>{
                    const productPrev = singleProduct;
                    productPrev.cycleType = value.label;
                    changeSingleProduct(productPrev)
                }} options={cycleOptions}></Select>}
            </Form.Group>
            }
            </>}
            
            <Form.Group className='mb-3'>
                <Form.Control type='text' value={singleProduct.descPoint1} readonly ></Form.Control>
                <Form.Control type='text' ref={descPoint1} placeholder='Enter Description Point 1'></Form.Control>                
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='text' value={singleProduct.descPoint2} readonly ></Form.Control>
                <Form.Control type='text' ref={descPoint2} placeholder='Enter Description Point 2'></Form.Control>                
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='text' value={singleProduct.descPoint3} readonly ></Form.Control>
                <Form.Control type='text' ref={descPoint3} placeholder='Enter Description Point 3'></Form.Control>                
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='text' value={singleProduct.descPoint4} readonly ></Form.Control>
                <Form.Control type='text' ref={descPoint4} placeholder='Enter Description Point 4'></Form.Control>                
            </Form.Group>            
        </>
        }


        {   
        
        singleProduct.categories === 'Cycle' && 
            <>
            <Form.Group className="mb-3">
                {singleProduct &&
                <>
                <Form.Label>User Type</Form.Label>
                  <Select isMulti={true} options={userTypes} onChange={(value)=>{
                    let prevProduct = singleProduct;
                    prevProduct.userType = value;
                    changeSingleProduct(prevProduct);
                }} defaultValue={singleProduct.type}></Select>
                </>
                }
            </Form.Group>


                <Form.Group className="mb-3">
                {singleProduct && <>
                <Form.Label>Product Category</Form.Label>
                <Select isMulti={true} options={category} onChange={(value)=>{
                    let prevProduct = singleProduct;
                    prevProduct.category = value;
                    changeSingleProduct(prevProduct);
                }} defaultValue={singleProduct.category}></Select></>}        
            </Form.Group>
                  

            {singleProduct &&
                        <>
            <Form.Group 
            className="mb-3">
                    <Form.Label>No of Gears</Form.Label>
                    <Form.Control className='mb-2' value={singleProduct['no. of gears']} readOnly ></Form.Control>
                    <Form.Control type="text" ref={gearRef} placeholder="Enter Gear Type" />
            </Form.Group>
            </>}        

                    
            {singleProduct && <>

            
                <Form.Group className="mb-3">
                    <Form.Label>Wheel Size</Form.Label>
                    <Form.Control className='mb-2' value={singleProduct['wheel size']} readOnly ></Form.Control>
                    <Form.Control type="text" ref={tireRef} placeholder="Enter Wheel Size" />
                </Form.Group></>}
            

            {singleProduct && <>

            
                <Form.Group className="mb-3">
                    <Form.Label>Front Deraileur</Form.Label>
                    <Form.Control className='mb-2' value={singleProduct['front deraileur']} readOnly></Form.Control>
                    <Form.Control type="text" ref={frontRef} placeholder="Enter Front Derail Type" />
                </Form.Group>        
            </> }

            {singleProduct && 
            <>
                <Form.Group className='mb-3'> 
                    <Form.Label>Frame Material</Form.Label>
                    <Form.Control className='mb-2' value={singleProduct['frame material']}></Form.Control>
                    <Form.Control type='text' ref={frameRef} placeholder='Enter Frame Material'></Form.Control>
                </Form.Group>
            </>}

            {singleProduct && 
            <>
                <Form.Group className='mb-3'> 
                    <Form.Label>Brakes</Form.Label>
                    <Form.Control className='mb-2' value={singleProduct['brakes']}></Form.Control>
                    <Form.Control type='text' ref={brakeRef} placeholder='Enter Brake Material'></Form.Control>
                </Form.Group>

            </>}

            {
            singleProduct && <>

            
                <Form.Group className="mb-3">
                    <Form.Label>Rear Deraileur</Form.Label>
                    <Form.Control className='mb-2' value={singleProduct['rear deraileur']} readOnly ></Form.Control>
                    <Form.Control type="text" ref={rearRef} placeholder="Enter Rear Deraileur Type" />
                </Form.Group>
                        </>            
            }        
                
            
            {
                singleProduct && <>
                <Form.Group className="mb-3">
                    <Form.Label>Suspension Type</Form.Label>
                    <Form.Control className='mb-2' value={singleProduct['suspension']} readOnly></Form.Control>
                    <Form.Control type="text" ref={suspensionRef} placeholder="Enter Rear Deraileur Type" />
                </Form.Group>
                </>            
            }

            {
            singleProduct && <>
                <Form.Group className="mb-3">
                    <Form.Label>Weight Of Cycle</Form.Label>
                    <Form.Control className='mb-2' value={singleProduct['weight']} readOnly ></Form.Control>
                    <Form.Control type="text" ref={weightRef} placeholder="Enter Weight of the Cycle" />
                </Form.Group>

                        </>            
            }   
        </>     
        }
                


    
            
        { singleProduct &&  <Button variant="primary" type="submit" onClick={submitHandler}>
            Submit
        </Button> }
        </>}
            
            </div>
        </>
    )
}

export default EditProduct
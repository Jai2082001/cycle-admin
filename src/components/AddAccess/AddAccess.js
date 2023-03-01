import { Form, Button, Spinner } from 'react-bootstrap'
import  Select  from 'react-select'
import { useEffect, useRef, useState } from 'react'

const AddAccess = () => {
    const nameRef = useRef();
    const priceRef = useRef();
    const overpriceRef = useRef();
    const descRef = useRef();
    const dispalyImageRef = useRef();
    const inputRef = useRef();
    const quantity = useRef();
    const [loading, changeLoading] = useState(false);
    const [brandNames, changeBrandNames] = useState(false);
    const [coupons, changeCoupons] = useState(false);
    const [productType, changeProductType] = useState(false);
    const [singleProduct, changeProduct] = useState({});
    const [quantityState, changeQuantityState] = useState(false);
    const [added, setAdded] = useState(false)

    
    const stockType = [
        { label: 'In Stock', value: true },
        {label: 'Out of Stock', value: false}
    ]
    let array = [];
    const buttonHandler = (event) => {
        event.preventDefault();
        let accessory = nameRef.current.value;
        let desc = descRef.current.value;
        let price = priceRef.current.value;
        let overprice = overpriceRef.current.value;
        
        console.log(inputRef.current); 
        console.log(dispalyImageRef.current)
        const files = inputRef.current.files;
        if (files.length > 0) {
            const delay = (file) => {
            return new Promise((resolve) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file)
                fileReader.onload = function (event) {
                    resolve(event.target.result);
                };
            })
        }
        const doNextPromise = (d) => {
            delay(files[d])
                .then(x => {
                    array.push(x);
                    d++;
                    if (d < files.length) {
                        doNextPromise(d)
                    }
                    else {
                        const fileReader = new FileReader();
                        const file = dispalyImageRef.current.files[0];
                      
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function (event) {
                        const date = new Date();
                        const dateText = date.toLocaleDateString();
                        const dataObj = {
                        type: singleProduct.type,
                        accessory: accessory,
                        brand: singleProduct.brand,
                        coupon: singleProduct.coupon,
                        ridertype: singleProduct.riderType,
                        cycletype: singleProduct.cycleType,
                        desc: desc,
                        price: price,
                        overprice: overprice,
                        displayimages: event.target.result,
                        images: array,
                        quantity: quantity.current.value,
                        stock: singleProduct.stockType,
                    }
                    fetch(`${process.env.REACT_APP_FETCH_LINK}/addProduct`, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            "Content-Type": 'application/json',
                        },
                        body: JSON.stringify(dataObj)
                    }).then((response) => {
                        return response.json()
                    }).then((response) => {
                        console.log(response)
                        if (response.status) {
                            setAdded({ nature: 'error', msg: response.status });
                        } else {
                            setAdded({ nature: 'success', msg: 'Added In The Database' });
                        }
                    })
                    }
                    }

                })
           
            }
         
        doNextPromise(0);        
        } else {
        const fileReader = new FileReader();
        const file = dispalyImageRef.current.files[0];         
        fileReader.readAsDataURL(file);
            fileReader.onload = function (event) {

                const date = new Date();
                const dateText = date.toLocaleDateString();
                const dataObj = {
                    type: singleProduct.type,
                    accessory: accessory,
                    brand: singleProduct.brand,
                    coupon: singleProduct.coupon,
                    ridertype: singleProduct.riderType,
                    cycletype: singleProduct.cycleType,
                    desc: desc,
                    price: price,
                    overprice: overprice,
                    displayimages: event.target.result,
                    images: array,
                    quantity: quantity.current.value,
                    stock: singleProduct.stockType,
                }
                fetch(`${process.env.REACT_APP_FETCH_LINK}/addProduct`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'addedby': 'Admin',
                        "Content-Type": 'application/json',
                    },
                    body: JSON.stringify(dataObj)
                }).then((response) => {
                    return response.json()
                }).then((response) => {
                    console.log(response)
                    if (response.status) {
                        setAdded({ nature: 'error', msg: response.status });
                    } else {
                        setAdded({ nature: 'success', msg: 'Added In The Database' });
                    }
                })
            }
        }
        
        
    }

    useEffect(() => {
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/brandDisplay`).then((response) => {
            return response.json()
        }).then((response) => {
            const array = response.map((item) => {
                return { label: item.subName, value: item };
            })
            changeBrandNames(array);
        })
        fetch(`${process.env.REACT_APP_FETCH_LINK}/couponDisplay`).then((response) => {
            return response.json();
        }).then((response) => {
            const array = response.map((item) => {
                return { label: item.code, value: item };
            });
            changeCoupons(array)
            changeLoading(false)
        })
    }, [])

    let options = [
        { label: 'Rider', value: 'Rider' },
        {label: 'Cycle' , value: 'Cycle'}
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
        { (loading === true) &&  (<Spinner animation='grow'></Spinner>)}
        { !loading &&  <div>
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>Accessory Name</Form.Label>
                <Form.Control ref={ nameRef } type="text" placeholder="Enter Accessory Name" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Accessory Price</Form.Label>
                <Form.Control ref={ priceRef } type="number" placeholder="Enter Accessory Price" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Accessory Overprice</Form.Label>
                <Form.Control ref={ overpriceRef } type="number" placeholder="Enter Accessory Overprice" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Accessory Type</Form.Label>
                    <Select options={options} onChange={(value) => {
                            console.log(value);
                    if (value.value === 'Rider') {
                        changeProductType('rider')
                    } else if(value.value === 'Cycle'){
                        changeProductType('cycle') 
                    } else {
                        changeProductType(false)
                    }
                    let productPrev = singleProduct;
                    productPrev.type = value.value;
                    changeProduct(productPrev);
                }}></Select>
                        {productType === 'rider' && <Select onChange={(value) => {
                            let productPrev = singleProduct;
                            productPrev.riderType = value.value;
                            changeProduct(productPrev);
                        }} options={riderOption}></Select>}
                        {productType === 'cycle' && <Select onChange={(value) => {
                            let productPrev = singleProduct;
                            productPrev.cycleType = value.value;
                            changeProduct(productPrev);
                        }} options={cycleOptions}></Select>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description of the Product</Form.Label>
                <Form.Control ref={ descRef } type="text" placeholder="Enter Accessory Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Brand Name</Form.Label>
                <Select onChange={(value)=>{
                            console.log(value);
                    let productPrev = singleProduct;
                    productPrev.brand = value.value;
                    changeProduct(productPrev);
                }} options={brandNames}></Select>
                    </Form.Group>
                         <Form.Group className='mb-3'>
                    <Form.Label>In Stock or not</Form.Label>
                    <Select options={stockType} onChange={(value) => {
                        console.log('here')
                        console.log(value)
                        if (value.value) {
                            changeQuantityState(true)
                        } else {
                            changeQuantityState(false)
                        }
                        let productPrev = singleProduct;
                        productPrev.stockType = value.value;
                        changeProduct(productPrev)
                    }}>
                    </Select>
                </Form.Group>

                {!quantityState &&
                <Form.Group className='mb-3'>
                    <Form.Label>Product Quantity</Form.Label>   
                    <Form.Control readOnly type='number' ref={quantity} value='0' placeholder='Enter Product Quantity'></Form.Control>
                </Form.Group>}

                {quantityState &&
                <Form.Group className='mb-3'>
                    <Form.Label>Product Quantity</Form.Label>
                    <Form.Control min='1' type='number' ref={quantity} placeholder='Enter Product Quantity'></Form.Control>
                </Form.Group>
                }
                     
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Coupon Applicable</Form.Label>
                <Select onChange={(value)=>{
                    let productPrev = singleProduct;
                    productPrev.coupon = value;
                    changeProduct(productPrev);
                }} isMulti={true} options={coupons}></Select>
            </Form.Group>

            <p>Main Display Image  <input type='file' className='mt-2 mb-2' accept='image/jpeg, image/png' ref={dispalyImageRef}></input></p>
                
            <p>Secondary Display Image  <input type="file" className='mb-2' multiple accept='image/jpeg, image/png' ref={inputRef} /></p>
        

            
            <Button onClick={buttonHandler} variant="primary" type="submit">
                Submit
            </Button>
        </Form>
            </div>}
        </>
    );
}

export default AddAccess
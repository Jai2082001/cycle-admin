import { Form, Button, Alert, Spinner, PopoverBody, Container, Row, Col } from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';
import Select from 'react-select';


const AddProduct = () => {
    const nameRef = useRef();
    const priceRef = useRef();
    const descRef = useRef();
    const overPriceRef = useRef();
    const frontRef = useRef();
    const rearRef = useRef();
    const frameRef = useRef();
    const gearRef = useRef();
    const brakeRef = useRef();
    const tireRef = useRef();
    const weightRef = useRef();
    const lenghtRef = useRef();
    const widthRef = useRef();
    const heightRef = useRef();
    const inputRef = useRef();
    const suspensionRef = useRef();
    const dispalyImageRef = useRef();
    const descPoint1 = useRef();
    const descPoint2 = useRef();
    const descPoint3 = useRef();
    const descPoint4 = useRef();
    const gstRef = useRef();
    const hsnRef = useRef();
    const quantity = useRef()
    let array = [];

    const [loading, changeLoading] = useState(false);
    const [brand, changeBrand] = useState([]);
    const [quantityState, changeQuantityState] = useState(false);
    const [category, changeCategory] = useState([]);
    const [product, changeProduct] = useState({});
    const [coupon, changeCoupon] = useState([]);
    const [added, setAdded] = useState(false);
    const [categories, changeCategoryType] = useState(false);
    const [parentCategory, changeParentCategory] = useState([]);
    const [brandType, changeBrandType] = useState(false);
    const [userType, changeUser] = useState(false);
    const [productType, changeProductType] = useState(false);
    const [parentProductType, changeParentProductType] = useState([]);
    const [filterArray, changeFilterArray] = useState([]);
    const [status, changeStatus] = useState(true);

    let data = {};

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/brandDisplay`).then((response) => {
            return response.json();
        }).then((response) => {
            const array = response.map((item) => {
                return { label: item.subName, value: item }
            })
            changeBrand(array);
        })
        fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryDisplay`).then((response) => {
            return response.json();
        }).then((response) => {
            const array = response.map((item) => {
                return { label: item.name, value: item }
            })
            changeParentCategory(response)
        })
        fetch(`${process.env.REACT_APP_FETCH_LINK}/couponDisplay`).then((response) => {
            return response.json();
        }).then((response) => {
            const array = response.map((item) => {
                return { label: item.code, value: item }
            })
            changeCoupon(array)
            fetch(`${process.env.REACT_APP_FETCH_LINK}/displayProductType`).then((response) => {
                return response.json()
            }).then((response) => {
                changeParentProductType(response)
            })
        })
    }, [])


    let riderOption = [
        { label: 'Backpacks', value: 'Backpacks' },
        { label: 'Compression and Inner Wear', value: 'Compression and Inner Wear' },
        { label: 'Eyewear', value: 'Eyewear' },
        { label: 'Face Masks', value: 'Face Masks' },
        { label: 'Footwear', value: 'Footwear' },
        { label: 'Gloves', value: 'Gloves' },
        { label: 'Helmets', value: 'Helmets' },
        { label: 'Jerseys', value: 'Jerseys' },
        { label: 'Recovery and Body Care', value: 'Recovery and Body Care' },
        { label: 'Shorts', value: 'Shorts' },
        { label: 'T-Shirts', value: 'T-Shirts' }
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

    const userTypesArray = [
        { label: "Male", value: 'm' },
        { label: "Female", value: 'f' },
        { label: "Children", value: 'c' }
    ];

    let options = [
        { label: 'Rider', value: 'Rider' },
        { label: 'Cycle', value: 'Cycle' }
    ]
    const stockType = [
        { label: 'In Stock', value: true },
        { label: 'Out of Stock', value: false }
    ]

    const emiAvailability = [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
    ]

    const typeProduct = parentProductType.map((singleItem) => {
        return { label: singleItem.name, value: singleItem }
    })


    console.log(category)

    typeProduct.push({ label: 'Cycle', value: { name: 'Cycle' } })

    // typeProduct.push({label: 'Accessories', value: {name: 'access'}})


    const buttonHandler = (event) => {
        event.preventDefault();

        if (categories === 'Cycle') {
            if (nameRef.current.value && priceRef.current.value && product.category && product.userType && product.brand && descRef.current.value && product.emi && overPriceRef.current.value && tireRef.current.value && frameRef.current.value && brakeRef.current.value && gearRef.current.value && weightRef.current.value && heightRef.current.value && lenghtRef.current.value && widthRef.current.value && inputRef.current.files.length > 0 && dispalyImageRef.current.files.length > 0 && product.stockType && frontRef.current.value && rearRef.current.value && suspensionRef.current.value && gstRef.current.value && hsnRef.current.value) {
                if (inputRef.current.files <= 0 || dispalyImageRef.current.files <= 0) {
                    return
                }
                setAdded(false)
                changeLoading(true);
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
                                        let date = new Date();
                                        let dateText = date.toLocaleDateString();
                                        let dataObj;
                                        if (categories === 'Cycle') {

                                            dataObj = {
                                                name: nameRef.current.value.trim(),
                                                price: priceRef.current.value.trim(),
                                                category: product.category,
                                                coupon: product.coupon,
                                                userType: product.userType,
                                                brand: product.brand,
                                                desc: descRef.current.value.trim(),
                                                emi: product.emi,
                                                overprice: overPriceRef.current.value,
                                                tire: tireRef.current.value.trim(),
                                                frame: frameRef.current.value.trim(),
                                                brake: brakeRef.current.value.trim(),
                                                gear: gearRef.current.value.trim(),
                                                weight: weightRef.current.value.trim(),
                                                height: heightRef.current.value.trim(),
                                                lenght: lenghtRef.current.value.trim(),
                                                width: widthRef.current.value.trim(),
                                                images: array,
                                                displayimages: event.target.result,
                                                dateadded: dateText,
                                                stock: product.stockType,
                                                front: frontRef.current.value.trim(),
                                                rear: rearRef.current.value.trim(),
                                                suspension: suspensionRef.current.value.trim(),
                                                quantity: quantity.current.value.trim(),
                                                categories: categories,
                                                gst: gstRef.current.value.trim(),
                                                hsn: hsnRef.current.value.trim()
                                            }
                                        }
                                        fetch(`${process.env.REACT_APP_FETCH_LINK}/addProduct`, {
                                            method: "POST",
                                            headers: {
                                                'Accept': 'application/json',
                                                "Content-Type": 'application/json',
                                                'addedby': 'Admin'
                                            },
                                            body: JSON.stringify(dataObj)
                                        }).then((response) => {
                                            return response.json()
                                        }).then((response) => {
                                            changeLoading(false)
                                            console.log(response);
                                            alert("Action Done")
                                            window.location.reload()
                                            if (response.status) {
                                                setAdded({ nature: 'error', msg: 'Already in the database' });
                                            } else {
                                                setAdded({ nature: 'success', msg: 'Added In The Database' });
                                            }
                                        })
                                    }
                                }

                            })

                    }

                    doNextPromise(0);
                }

            } else {
                alert("All Fields are not attended")
            }

        } else if (categories) {

            if(nameRef.current.value && priceRef.current.value && product.category && descPoint1.current.value && descPoint2.current.value && descPoint3.current.value && descPoint4.current.value && product.brand && descRef.current.value && product.emi && overPriceRef.current.value && inputRef.current.files.length > 0 && dispalyImageRef.current.files.length > 0 && product.stockType && quantity.current.value && product.category && weightRef.current.value && heightRef.current.value && lenghtRef.current.value && widthRef.current.value && gstRef.current.value && hsnRef.current.value ){
                if(filterArray){
                    let flagVariable = true;

                    filterArray.map((singleItem)=>{
                        if(!(product[singleItem])){
                            flagVariable = false
                        }
                    })

                    if(flagVariable){
                        if (inputRef.current.files <= 0 || dispalyImageRef.current.files <= 0) {
                            return
                        }
                        setAdded(false)
                        changeLoading(true);
                        console.log("Filter")
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
                                                let date = new Date();
                                                let dateText = date.toLocaleDateString();
                                                let dataObj;
                                                dataObj = {
                                                    name: nameRef.current.value.trim(),
                                                    price: priceRef.current.value.trim(),
                                                    category: product.category,
                                                    coupon: product.coupon,
                                                    descPoint1: descPoint1.current.value.trim(),
                                                    descPoint2: descPoint2.current.value.trim(),
                                                    descPoint3: descPoint3.current.value.trim(),
                                                    descPoint4: descPoint4.current.value.trim(),
                                                    brand: product.brand,
                                                    desc: descRef.current.value.trim(),
                                                    emi: product.emi,
                                                    overprice: overPriceRef.current.value.trim(),
                                                    images: array,
                                                    displayimages: event.target.result,
                                                    dateadded: dateText,
                                                    stock: product.stockType,
                                                    quantity: quantity.current.value.trim(),
                                                    categories: categories,
                                                    category: product.category,
                                                    weight: weightRef.current.value.trim(),
                                                    height: heightRef.current.value.trim(),
                                                    lenght: lenghtRef.current.value.trim(),
                                                    width: widthRef.current.value.trim(),
                                                    gst: gstRef.current.value.trim(),
                                                    hsn: hsnRef.current.value.trim()
                                                }
                                                if(filterArray){
                                                    if(filterArray.length>0){
                                                        filterArray.map((singleItem)=>{
                                                            dataObj[singleItem] = product[singleItem]
                                                        })
                                                    }
                                                }
                                                fetch(`${process.env.REACT_APP_FETCH_LINK}/addProduct`, {
                                                    method: "POST",
                                                    headers: {
                                                        'Accept': 'application/json',
                                                        "Content-Type": 'application/json',
                                                        'addedby': 'Admin'
                                                    },
                                                    body: JSON.stringify(dataObj)
                                                }).then((response) => {
                                                    return response.json()
                                                }).then((response) => {
                                                    changeLoading(false)
                                                    console.log(response);
                                                    alert("Action Done")
                                                    window.location.reload()
                                                    if (response.status) {
                                                        setAdded({ nature: 'error', msg: 'Already in the database' });
                                                    } else {
                                                        setAdded({ nature: 'success', msg: 'Added In The Database' });
                                                    }
                                                })
                                            }
                                        }
            
                                    })
            
                            }
            
                            doNextPromise(0);
                        }
                    }else {
                        alert("All Fields are not attended")
                    }
                }else{
                    if (inputRef.current.files <= 0 || dispalyImageRef.current.files <= 0) {
                        return
                    }
                    setAdded(false)
                    changeLoading(true);
                    console.log("adaddawwwww")
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
                                            let date = new Date();
                                            let dateText = date.toLocaleDateString();
                                            let dataObj;
                                            dataObj = {
                                                name: nameRef.current.value.trim(),
                                                price: priceRef.current.value.trim(),
                                                category: product.category,
                                                coupon: product.coupon,
                                                descPoint1: descPoint1.current.value.trim(),
                                                descPoint2: descPoint2.current.value.trim(),
                                                descPoint3: descPoint3.current.value.trim(),
                                                descPoint4: descPoint4.current.value.trim(),
                                                brand: product.brand,
                                                desc: descRef.current.value.trim(),
                                                emi: product.emi,
                                                overprice: overPriceRef.current.value.trim(),
                                                images: array,
                                                displayimages: event.target.result,
                                                dateadded: dateText,
                                                stock: product.stockType,
                                                quantity: quantity.current.value.trim(),
                                                categories: categories,
                                                category: product.category,
                                                weight: weightRef.current.value.trim(),
                                                height: heightRef.current.value.trim(),
                                                lenght: lenghtRef.current.value.trim(),
                                                width: widthRef.current.value.trim(),
                                                gst: gstRef.current.value.trim(),
                                                hsn: hsnRef.current.value.trim()
                                            }
                                            if(filterArray){
                                                if(filterArray.length>0){
                                                    filterArray.map((singleItem)=>{
                                                        dataObj[singleItem] = product[singleItem]
                                                    })
                                                }
                                            }
                                            
        
                                            fetch(`${process.env.REACT_APP_FETCH_LINK}/addProduct`, {
                                                method: "POST",
                                                headers: {
                                                    'Accept': 'application/json',
                                                    "Content-Type": 'application/json',
                                                    'addedby': 'Admin'
                                                },
                                                body: JSON.stringify(dataObj)
                                            }).then((response) => {
                                                return response.json()
                                            }).then((response) => {
                                                changeLoading(false)
                                                console.log(response);
                                                alert("Action Done")
                                                window.location.reload()
                                                if (response.status) {
                                                    setAdded({ nature: 'error', msg: 'Already in the database' });
                                                } else {
                                                    setAdded({ nature: 'success', msg: 'Added In The Database' });
                                                }
                                            })
                                        }
                                    }
        
                                })
        
                        }
        
                        doNextPromise(0);
                    }
                }
            }
            else{
                alert("All Fields are not attended")
            }
            
        }


    }


    const FilterComponent = ({ product, changeProduct, filter }) => {

        const onChangeHandler = (event) => {
            let prevProduct = product;
            prevProduct[filter] = event.target.value;
            console.log(prevProduct)
            changeProduct(prevProduct)
        }

        return (
            <Form.Group>
                <Form.Label>{`Enter ${filter}`}</Form.Label>
                <Form.Control onChange={onChangeHandler}></Form.Control>
            </Form.Group>
        )
    }

    return (

        <Form>

            <Alert variant='secondary' className={'mt-3 mb-3'}>Every Field is Important Dont Leave Any Field Unattended</Alert>

            <Container style={{ padding: '0px' }}>

                {/* {(added && added.nature === 'error') && <Alert variant='danger'>{added.msg}</Alert>}
                {(added && added.nature === 'success') && <Alert variant='info'>{added.msg}</Alert>} */}

                <Row>

                    <Col lg={'4'}>

                        <Form.Group className='mb-3'>
                            <Form.Label>Product Type</Form.Label>
                            <Select options={typeProduct} onChange={(value) => {
                                let productPrev = product;
                                productPrev.productType = value;
                                let newArray = parentCategory.filter((item) => {
                                    return item.parentName === value.value.name
                                })
                                newArray = newArray.map((item) => {
                                    return { label: item.name, value: item }
                                })
                                if(newArray.length === 0){
                                    newArray.push({label: value.value.name, value: value})
                                }
                                changeCategory(newArray)
                                changeProduct(productPrev)
                                changeCategoryType(value.value.name)
                            }}></Select>
                        </Form.Group>
                    </Col>
                    <Col lg={'4'}>
                        {categories &&
                            <Form.Group className='mb-3'>
                                <Form.Label>Brand Name</Form.Label>
                                <Select options={brand} onChange={(value) => {
                                    let productPrev = product;
                                    productPrev.brand = value;
                                    changeProduct(productPrev);
                                }}></Select>
                            </Form.Group>}
                    </Col>
                    <Col lg={'4'}>
                        {categories &&
                            <Form.Group className='mb-3'>
                                <Form.Label>In Stock or not</Form.Label>
                                <Select options={stockType} onChange={(value) => {
                                    if (value.value) {
                                        changeQuantityState(true)
                                    } else {
                                        changeQuantityState(false)
                                    }
                                    let productPrev = product;
                                    productPrev.stockType = value.value;
                                    changeProduct(productPrev)
                                }}>
                                </Select>
                            </Form.Group>
                        }
                    </Col>
                    <Col lg={'4'}>
                        {categories &&
                            <Form.Group className='mb-3'>
                                <Form.Label>HSN CODE</Form.Label>
                                <Form.Control type='number' ref={hsnRef} placeholder='Enter HSN Code'></Form.Control>
                            </Form.Group>
                        }
                    </Col>
                    <Col lg={'4'}>

                        {categories &&
                            <Form.Group className='mb-3'>
                                <Form.Label>GST RATE</Form.Label>
                                <Form.Control type='number' ref={gstRef} placeholder='Enter GST Rate'></Form.Control>
                            </Form.Group>}
                    </Col>
                    <Col lg={'4'}>
                        {
                            !quantityState && categories &&
                            <Form.Group className='mb-3'>
                                <Form.Label>Product Quantity</Form.Label>
                                <Form.Control readOnly type='number' ref={quantity} value='0' placeholder='Enter Product Quantity'></Form.Control>
                            </Form.Group>
                        }
                    </Col>
                    <Col lg={'4'}>
                        {quantityState && categories &&
                            <Form.Group className='mb-3'>
                                <Form.Label>Product Quantity</Form.Label>
                                <Form.Control min='1' type='number' ref={quantity} placeholder='Enter Product Quantity'></Form.Control>
                            </Form.Group>
                        }
                    </Col>
                    <Col lg={'4'}>
                        {categories &&
                            <Form.Group className='mb-3'>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type='text' ref={nameRef} placeholder='Enter Product Name'></Form.Control>
                            </Form.Group>}
                    </Col>
                    <Col lg={'4'}>
                        {categories && <Form.Group className='mb-3'>
                            <Form.Label>Price of the Product</Form.Label>
                            <Form.Control type='number' ref={priceRef} placeholder='Enter price'></Form.Control>
                        </Form.Group>}
                    </Col>
                    <Col lg={'4'}>
                        {categories && <Form.Group className='mb-3'>
                            <Form.Label>Overprice of the Product</Form.Label>
                            <Form.Control type='number' ref={overPriceRef} placeholder='Enter overprice'></Form.Control>
                        </Form.Group>}
                    </Col>
                    <Col lg={'4'}>
                        {categories && <Form.Group className="mb-3">
                            <Form.Label>Coupon Applicable</Form.Label>
                            <Select isMulti={true} options={coupon} onChange={(value) => {
                                let productPrev = product;
                                productPrev.coupon = value;
                                changeProduct(productPrev);
                            }}></Select>
                        </Form.Group>
                        }
                    </Col>
                    <Col lg={'4'}>
                        {categories &&
                            <Form.Group className="mb-3">
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control type="text" ref={descRef} placeholder="Enter Description" />
                            </Form.Group>}
                    </Col>
                    <Col lg={'4'}>
                        {categories !== 'Cycle' && categories &&
                            <Form.Group className='mb-3'>
                                <Form.Label>Description Point 1</Form.Label>
                                <Form.Control type='text' ref={descPoint1} placeholder='Enter Description Point 1'></Form.Control>
                            </Form.Group>}
                    </Col>
                    <Col lg={'4'}>
                        {categories !== 'Cycle' && categories &&
                            <Form.Group className='mb-3'>
                                <Form.Label>Description Point 2</Form.Label>
                                <Form.Control type='text' ref={descPoint2} placeholder='Enter Description Point 2'></Form.Control>
                            </Form.Group>}
                    </Col>
                    <Col lg={'4'}>
                        {categories !== 'Cycle' && categories &&
                            <Form.Group className='mb-3'>
                                <Form.Label>Description Point 3</Form.Label>
                                <Form.Control type='text' ref={descPoint3} placeholder='Enter Description Point 3'></Form.Control>
                            </Form.Group>}
                    </Col>
                    <Col lg={'4'}>
                        {categories !== 'Cycle' && categories &&
                            <Form.Group className='mb-3'>
                                <Form.Label>Description Point 4</Form.Label>
                                <Form.Control type='text' ref={descPoint4} placeholder='Enter Description Point 4'></Form.Control>
                            </Form.Group>}
                    </Col>
                    <Col lg={'4'}>
                        {categories !== 'access' && categories &&
                            <Form.Group className="mb-3">
                                <Form.Label>{`Enter ${categories} Category`}</Form.Label>
                                <Select options={category} onChange={(value) => {
                                    let productPrev = product;
                                    productPrev.category = value;
                                    changeFilterArray(value.value.filterArray)
                                    changeProduct(productPrev);
                                }}></Select>
                            </Form.Group>
                        }
                    </Col>
                    <Col lg={'4'}>
                        {product.category && product.categories !== 'Cycle' && product.categories !== 'access' &&
                            // <Form.Group>
                            //     <Form.Label>{"Enter "}</Form.Label>
                            // </Form.Group>
                            <>
                            Filter Fields

                                {filterArray && filterArray.length > 0 &&
                                    <>
                                        {filterArray.map((singleItem) => {
                                            return (

                                                <FilterComponent changeProduct={changeProduct} filter={singleItem} product={product}></FilterComponent>
                                                // <Form.Group className={'mb-3'}>
                                                //     <Form.Label>{`Enter ${singleItem}`}</Form.Label>
                                                //     <Form.Control></Form.Control>
                                                // </Form.Group>
                                            )
                                        })}
                                    </>}

                            </>
                        }
                    </Col>

                    <Col lg={'4'}>
                        {categories === 'Cycle' &&
                            <Form.Group className={'mb-3'}>
                                <Form.Label>Enter User Type</Form.Label>
                                <Select isMulti={true} options={userTypesArray} onChange={(value) => {
                                    let productPrev = product;
                                    productPrev.userType = value
                                }}></Select>
                            </Form.Group>}
                    </Col>
                    <Col lg={'4'}>

                        {categories === 'access' &&

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Accessory Type</Form.Label>
                                <Select options={options} onChange={(value) => {
                                    if (value.value === 'Rider') {
                                        changeProductType('rider')
                                    } else if (value.value === 'Cycle') {
                                        changeProductType('cycle')
                                    } else {
                                        changeProductType(false)
                                    }
                                    let productPrev = product;
                                    productPrev.type = value.value;
                                    changeProduct(productPrev);
                                }}></Select>
                                {productType === 'rider' && <Select onChange={(value) => {
                                    let productPrev = product;
                                    productPrev.riderType = value.value;
                                    changeProduct(productPrev);
                                }} options={riderOption}></Select>}
                                {productType === 'cycle' && <Select onChange={(value) => {
                                    let productPrev = product;
                                    productPrev.cycleType = value.value;
                                    changeProduct(productPrev);
                                }} options={cycleOptions}></Select>}
                            </Form.Group>}
                    </Col>

                    {categories === 'Cycle' &&
                        <>
                            <Col lg={'4'}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Frame Materal</Form.Label>
                                    <Form.Control type="text" ref={frameRef} placeholder="Enter Frame Type" />
                                </Form.Group>
                            </Col>
                            <Col lg={'4'}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Brakes</Form.Label>
                                    <Form.Control type="text" ref={brakeRef} placeholder="Enter Brake Type" />
                                </Form.Group>
                            </Col>
                            <Col lg={'4'}>
                                <Form.Group className="mb-3">
                                    <Form.Label>No of Gears</Form.Label>
                                    <Form.Control type="text" ref={gearRef} placeholder="Enter Gear Type" />
                                </Form.Group>
                            </Col>
                            <Col lg={'4'}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Wheel Size</Form.Label>
                                    <Form.Control type="text" ref={tireRef} placeholder="Enter Wheel Size" />
                                </Form.Group>
                            </Col>
                            <Col lg={'4'}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Front Deraileur</Form.Label>
                                    <Form.Control type="text" ref={frontRef} placeholder="Enter Front Derail Type" />
                                </Form.Group>
                            </Col>
                            <Col lg={'4'}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rear Deraileur</Form.Label>
                                    <Form.Control type="text" ref={rearRef} placeholder="Enter Rear Deraileur Type" />
                                </Form.Group>
                            </Col>
                            <Col lg={'4'}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Suspension Type</Form.Label>
                                    <Form.Control type="text" ref={suspensionRef} placeholder="Enter Suspension Type" />
                                </Form.Group>
                            </Col>
                        </>
                    }


                    {categories &&
                        <>
                            <Col lg={'4'}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Weight Of Product</Form.Label>
                                    <Form.Control type="text" ref={weightRef} placeholder="Enter Weight of the Cycle" />
                                </Form.Group>
                            </Col>
                            <Col lg={'4'}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Length Of Product</Form.Label>
                                    <Form.Control type="text" ref={lenghtRef} placeholder="Enter Weight of the Cycle" />
                                </Form.Group>
                            </Col>
                            <Col lg={'4'}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Width Of Product</Form.Label>
                                    <Form.Control type="text" ref={widthRef} placeholder="Enter Weight of the Cycle" />
                                </Form.Group>
                            </Col>
                            <Col lg={'4'}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Height Of Product</Form.Label>
                                    <Form.Control type="text" ref={heightRef} placeholder="Enter Weight of the Cycle" />
                                </Form.Group>
                            </Col>
                        </>}

                    <Col lg={'4'}>
                        {categories &&
                            <Form.Group className="mb-3">
                                <Form.Label>EMI Available</Form.Label>
                                <Select options={emiAvailability} onChange={(value) => {
                                    let productPrev = product;
                                    productPrev.emi = value.value;
                                    changeProduct(productPrev);
                                }}></Select>
                            </Form.Group>}
                    </Col>
                    {categories &&
                        <>
                            <p>Main Display Image  <input type='file' className='mt-2 mb-2' ref={dispalyImageRef} accept='image/jpeg, image/png'></input></p>
                            <p>Secondary Display Image  <input type="file" className='mb-2' multiple accept='image/jpeg, image/png' ref={inputRef} /></p>
                            <Button variant="primary" type="submit" onClick={buttonHandler}>{!loading && 'Submit'}{loading && <Spinner animation='grow'></Spinner>}</Button>
                        </>
                    }

                </Row>
            </Container>
        </Form>
    )
}

export default AddProduct;
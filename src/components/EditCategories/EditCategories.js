import { Form, Button, ButtonGroup, Dropdown, Alert, Spinner } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import classes from './EditCategories.module.css';
import Select from 'react-select';

const EditCategories = () => {
    const imgRef = useRef()
    const imgEditRef = useRef();
    const [data, changeData] = useState([])
    const [categoryAction, changeCategoryAction] = useState('addCategory');
    const [inputFocus, changeInputFocus] = useState(false);
    const [dataArray, changeDataArray] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [remover, setRemover] = useState('');
    const [single, changeSingle] = useState();
    const [editSingle, changeEditSingle] = useState();
    const [filterArray, changeFilterArray] = useState([]);
    const [editOption, changeEditOption] = useState([]);
    const [editProduct, changeEditProduct] = useState(false);
    const [editLoad, changeEditLoad] = useState(false); 

    const categoryNameEditRef = useRef();
    const categoryNameRef = useRef();
    const categoryDescRef = useRef();
    const filterRef = useRef();
    const arrayNew = [];

    console.log(filterArray)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryDisplay`).then((response) => {
            return response.json()
        }).then((response) => {
            changeDataArray(response);
            let array = []
            response.map((single) => {
                array.push({ label: single.name, value: single })
            })
            changeEditOption(array);
            fetch(`${process.env.REACT_APP_FETCH_LINK}/displayProductType`).then((response) => {
                return response.json()
            }).then((response) => {
                response.push({ name: 'Cycle' })
                changeData(response)
            })
        })
    }, [loading, editLoad])

    const secondDataArray = data.map((item) => {
        return { label: item.name, value: item }
    })

    const removeHandler = (itemName) => {
        setLoading(true)
        const array = dataArray.filter((item) => {
            return item.name !== itemName.name;
        })
        changeDataArray(array)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryRemove`, {
            headers: {
                name: itemName.name
            }
        }).then((response) => {
            return response.json();
        }).then((response) => {
            setError('removeDone');
            setLoading(false);
        })
    }
    const buttonHandler = (event) => {
        event.preventDefault();

        if (categoryNameRef.current.value === '') {
            setError('categoryName');
            return
        } else {
            setLoading(true)
            const files = imgRef.current.files;
            if (files.length <= 0) {
                setError('img empty')
            }
            else {
                const files = imgRef.current.files[0]
                console.log(files)
                let parentName;
                if (single) {
                    parentName = single.name
                }
                const fileReader = new FileReader();
                fileReader.readAsDataURL(files);
                fileReader.onload = function (event) {
                    const dataObj = {
                        name: categoryNameRef.current.value,
                        img: event.target.result,
                        desc: categoryDescRef.current.value,
                        parentName: parentName,
                        filterArray: filterArray
                    }

                    fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryAdd`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            addedBy: 'Admin'
                        },
                        body: JSON.stringify(dataObj)
                    }).then((response) => {
                        return response.json()
                    }).then((response) => {
                        console.log(response)
                        setLoading(false)
                    })
                }
            }

        }
    }

    const addFilterEvent = (e) => {
        console.log('BOo')
        e.preventDefault();
        const newFilter = filterRef.current.value
        let prevArray = [...filterArray];
        for(let i=0;i<prevArray.length;i++){
            if(newFilter === prevArray[i]){
                alert('Already included')
                return
            }
        }
        prevArray.push(newFilter)
        changeFilterArray(prevArray);
    }

    const deleteFilter = (item) => {
        const prevFilter = [...filterArray];
        const array = prevFilter.filter((singleItem)=> {
            return singleItem != item
        })
        changeFilterArray(array)
    }
    const updateDetailsAction = () => {
        changeEditLoad(true);

        const files = imgEditRef.current.files;
        if (files.length <= 0) {
            const dataObj = {
                oldname: editProduct.name,
                name: categoryNameEditRef.current.value ? categoryNameEditRef.current.value : editProduct.name,
                img: editProduct.img,
                parentName: editSingle ? editSingle : editProduct.parentName,
                filterArray: filterArray
            }
            fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryEdit`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    addedBy: 'Admin'
                },
                body: JSON.stringify(dataObj)
            }).then((response) => {
                return response.json()
            }).then((response) => {
                console.log(response)
                changeEditLoad(false)
            })
        } else {
            const files = imgEditRef.current.files[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.onload = function (event) {
                const dataObj = {
                    oldname: editProduct.name,
                    name: categoryNameEditRef.current.value ? categoryNameEditRef.current.value : editProduct.name,
                    img: event.target.result,
                    parentName: editSingle ? editSingle : editProduct.parentName
                }

                fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryEdit`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        addedBy: 'Admin'
                    },
                    body: JSON.stringify(dataObj)
                }).then((response) => {
                    return response.json()
                }).then((response) => {
                    console.log(response)
                    changeEditLoad(false)
                })
            }
        }

    }


    return (
        <div>
            <Form>
                <ButtonGroup className={'mt-2'}>
                    <Button onClick={() => { changeCategoryAction('addCategory') }}>Add Category</Button>
                    <Button className='ms-3' onClick={() => { changeCategoryAction('removeCategory') }}>Remove Category</Button>
                    <Button className={'ms-3'} onClick={() => { changeCategoryAction('editCategory') }}>Edit Category</Button>
                </ButtonGroup>
                {categoryAction === 'addCategory' &&
                    <>
                        <Form.Group className="mt-3" controlId="formBasicEmail">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control ref={categoryNameRef} type="email" placeholder="Enter Category" />
                        </Form.Group>

                        <Form.Group className='mt-3 mb-3'>
                            <Form.Label>Parent Category Name</Form.Label>
                            <Select onChange={(value) => {
                                changeSingle(value.value)
                            }} options={secondDataArray}></Select>
                        </Form.Group>
                        <>
                            <div className={classes.parentDiv}>
                                {arrayNew.map((singleItem, idx) => {
                                    return (
                                        <div className={classes.inputDiv}>
                                            <Form.Group className={'mt-2'}>
                                                <Form.Control></Form.Control>
                                            </Form.Group>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={'mt-3 mb-3'}>
                                <p>Filter Adder</p>
                                <Form.Control placeholder={'Add Filter'} ref={filterRef}></Form.Control>
                                <button className={'mt-2'} onClick={addFilterEvent}>Add Filter</button>
                                <Form.Group className={'mt-2 mb-2'}>
                                    {filterArray.map((singleItem) => {
                                        return (
                                            <div style={{ display: 'flex' }}>
                                                <Form.Control readOnly={true} value={singleItem}></Form.Control>
                                                <button onClick={() => { deleteFilter(singleItem) }}>Delete</button>
                                            </div>
                                        )
                                    })}
                                </Form.Group>

                            </div>
                            <Form.Group className='mt-3 mb-3'>
                                <Form.Label>Category Description</Form.Label>
                                <Form.Control ref={categoryDescRef} as='textarea' placeholder='Enter Description'></Form.Control>
                            </Form.Group>
                            <p>Enter A Image For Display Purpose <input accept='image/jpg, image/png image/jpeg' type='file' ref={imgRef}></input></p>

                            <Button onClick={buttonHandler} variant="primary" type="submit">
                                {loading && <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>} {!loading && 'Submit'}
                            </Button>

                            {error === 'imgEmpty' && <div>
                                <Alert variant='danger'>Input A Image</Alert>
                            </div>}

                            {error === 'categoryName' && <div>
                                <Alert variant='danger'>Category Name Cannot Be Empty</Alert>
                            </div>}

                        </>
                    </>
                }
                {categoryAction === 'removeCategory' &&
                    <div className={'mt-3'}>
                        <Form>
                            <Form.Control onChange={(event) => { setRemover(event.target.value) }} onFocus={() => { changeInputFocus(true) }} type='Name' ref={categoryNameRef} placeholder={'Enter Brand Name You Want To Delete'}></Form.Control>
                            {dataArray.length > 0 &&

                                <Dropdown.Menu show={inputFocus} style={{ width: '100%', position: 'static' }} >
                                    {dataArray.map((arrayItem) => {
                                        if (arrayItem.name.includes(remover)) {
                                            return (
                                                <div className={classes.deletableP}>
                                                    <Button variant='info' key={arrayItem._id} onClick={() => { removeHandler(arrayItem) }}>{!loading && arrayItem.name}{loading && <Spinner></Spinner>}</Button>
                                                </div>
                                            );
                                        }
                                    })}
                                </Dropdown.Menu>
                            }
                        </Form>
                        {error === 'removeDone' && <Alert variant='info'>{'Successfully Removed'}</Alert>}
                    </div>
                }
                {
                    categoryAction === 'editCategory' &&
                    <>
                        <Form.Group className={'mt-2'}>
                            <Select options={editOption} onChange={(value) => {
                                changeEditProduct(value.value);
                            }}></Select>
                        </Form.Group>

                        {editProduct &&
                            <>
                                <Form.Group className={'mt-2'}>
                                    <Form.Label>Category Name</Form.Label>
                                    <Form.Control readOnly={true} value={editProduct.name}></Form.Control>
                                    <Form.Control ref={categoryNameEditRef} className={'mt-2'} placeholder={'Update the Name'}></Form.Control>
                                </Form.Group>

                                <Form.Group className={'mt-2'}>
                                    <Form.Label>Parent Category</Form.Label>
                                    <Form.Control readOnly={true} value={editProduct.parentName}></Form.Control>
                                    <Form.Group className='mt-3 mb-3'>
                                        <Select onChange={(value) => {
                                            changeEditSingle(value.value)
                                        }} options={secondDataArray}></Select>
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group className={'mt-2'}>
                                    <Form.Label>Category Description</Form.Label>
                                    <Form.Control readOnly={true} value={editProduct.desc}></Form.Control>
                                    <Form.Group className={'mt-2'}>
                                        <Form.Control placeholder="Update the Desc"></Form.Control>
                                    </Form.Group>
                                </Form.Group>

                                <p className={'mt-2'}>Update Image on the Categories <input accept='image/jpg, image/png, image/jpeg' type='file' ref={imgEditRef}></input></p>
                                <Button onClick={updateDetailsAction}>{!editLoad && 'Update Details'}{editLoad && <Spinner animation='border' role='status'><span className="visually-hidden">Loading...</span></Spinner>}</Button>
                            </>}

                    </>
                }


            </Form>
        </div>
    )
}

export default EditCategories
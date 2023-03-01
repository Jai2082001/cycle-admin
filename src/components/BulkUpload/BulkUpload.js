import classes from './BulkUpload.module.css';
import readXlsxFile from 'read-excel-file';
import {Table, Button, Spinner, Modal} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import Select from 'react-select';
import DisplayImages from './DisplayImage/DisplayImage';
import ImageDisplay from './ImageDisplay/ImageDisplay';
import {Alert} from 'react-bootstrap'


const BulkUpload = () => {
    const [state, changeState] = useState([[]])
    const [head, changeHead] = useState([]);
    const [body, changeBody] = useState([]);
    const [loading, changeLoading] = useState(false);
    const [spinner, changeSpinner] = useState(false)
    const [bigLoading, changeBigLoading] = useState(false)
    const [categories, changeCategories] = useState([])
    const [brands, changeBrands] = useState([]);
    const [anotherLoading, changeAnotherLoading] = useState()
    const [coupons, changeCoupons] = useState([]);
    const [products, changeProducts] = useState([]);
    const [image, changeImage] = useState('');
    const [display, changeDisplay] = useState([])

    const btnHandler = (event) => {
        readXlsxFile(event.target.files[0]).then((rows)=>{
            changeState(rows)
            rows[0].push("Serial No.")
            rows[0].push('Images');
            rows[0].push('Display Images')
            changeHead(rows[0]);
            let body = []
            for(let i=0;i<rows.length;i++){
                if(i!==0){
                    rows[i].push(i)
                    rows[i].push('images');
                    rows[i].push('displayImages')
                    body.push(rows[i])
                }
            }
            changeBody(body)
        })
    }
    

    const submitHandler = () => {
        for(let i=0;i<body.length;i++){
            ((i)=>{
                changeSpinner(true)
                const sampleData = {}
                head.map((singleItem, idx)=>{
                    let obj = {}
                    sampleData[singleItem] = body[i][idx];
                })
                const array = [];
                const image = require(`../images/product/${i+1}.1.jpg`).default;
                const imageOne = require(`../images/product/${i+1}.2.jpg`);
                const imageSecond = require(`../images/product/${i+1}.3.jpg`);
                const imageThird = require(`../images/product/${i+1}.4.jpg`);
                const imageFourth = require(`../images/product/${i+1}.5.jpg`);
                console.log('image 1');
                console.log(imageOne)
                console.log('image 2');
                console.log(imageSecond)
                console.log('image 3');
                console.log(imageThird)
                console.log('image 4');
                console.log(imageFourth)
                array.push(imageOne.default);
                array.push(imageSecond.default);
                array.push(imageThird.default);
                array.push(imageFourth.default);
                console.log(array);
                const obj = {};
                obj.data = sampleData;
                obj.image = image;
                obj.imageArray = array;
                console.log('adadadad')
                fetch(`${process.env.REACT_APP_FETCH_LINK}/addBulkProduct`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },                   
                    body: JSON.stringify(obj)
                }).then((response)=>{
                    return response.json();
                }).then((response)=>{
                    changeSpinner(false)
                })
            })(i)
        }
    }

    const BodyTag = function({body}){
        return (
            <>

            { body.map((item, idx)=>{
                return (
                    <tr>
                    {   
                        item.map((single)=>{ 
                            return (
                                <>
                                    {(single !== 'images' && single !== 'displayImages' ) &&  <td>{single}</td>}                               
                                    {(single === 'images' && <ImageDisplay serial={idx + 1} changeImage={changeImage} ></ImageDisplay>)}
                                    {(single === 'displayImages' && <DisplayImages changeDisplay={changeDisplay} serial={idx + 1}></DisplayImages>)}
                                </>
                            )
                        })
                        
                    }
                    </tr>
                ) 
            })}
            </>
        )       
    }   
    return ( 
        <div style={{overflow: 'auto'}}>
        { bigLoading && 
        <>
            <Modal.Dialog>
                <Modal.Body>
                    <Spinner animation='border'></Spinner>
                </Modal.Body>
            </Modal.Dialog>
        </>
        }
        {
        !bigLoading && 
            <>
              
              <Select options={products}></Select>
                <Alert variant='danger' className={'mt-3'}>{'Make Sure Your Brand and Categories are Preadded before bulk uploading. Do not put space between User Type'}</Alert>
                <input style={{marginTop: '10px'}} onChange={btnHandler} type='file' accept='.xlsx, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'></input>
                <Table className={classes.tableDiv} bordered>
                    <thead>
                        <tr>
                            {head.map((singleItem)=>{
                                return(
                                    <th>{singleItem}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <BodyTag body={body}></BodyTag>
                    </tbody>
                </Table>   
            </>
        }
            
            
    {state[0].length>0 && <Button onClick={submitHandler}>{spinner && <Spinner animation='grow'></Spinner>}{!spinner && 'Submit the data'}</Button>}             
        
        </div>
    )
}

export default BulkUpload
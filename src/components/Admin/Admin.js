import { Navbar, Container, Row, Col } from 'react-bootstrap';
import classes from './Admin.module.css';
import Sidebar from '../Sidebar/Sidebar'
import { useState } from 'react';
import AddAccess from '../AddAccess/AddAccess';
import { Redirect } from 'react-router';
import AddProduct from '../AddProduct/AddProduct';
import EditCoupons from '../EditCoupons/EditCoupons';
import EditCategories from '../EditCategories/EditCategories';
import BrandNameEdit from '../BrandNameEdit/BrandNameEdit';
import EditProduct from '../EditProduct/EditProduct';
import EditAccess from '../EditAccesoriesHandler/EditAccess';
import UserOrderTracker from '../UserOrderTracker/UserOrderTracker';
import OrderStatusUpdate from '../OrderStatusUpdate/OrderStatusUpdate';
import OrderReceived from '../OrderReceived/OrderReceived';
import SubAdmin from '../SubAdmin/SubAdmin';
import { useCookies } from 'react-cookie';
import Statics from '../Statics/Statics';
import DeliveryAvail from '../DeliveryAvail/DeliveryAvail';
import BulkUpload from '../BulkUpload/BulkUpload';
import AddProductType from '../AddProductType/AddProductType';
import ImageCustomizer from '../ImageCustomizer/ImageCustomizer'
import Remove from '../Remove/Remove';
import ProductStructure from '../ProductStructure/ProductStructure';

const Admin = ({ secured, changeSecured }) => {
    const [currentFunc, changeCurrentFunc] = useState('chart');
    const [cookies, setCookies, removeCookies] = useCookies(['authenticated'])
    const logoutHandler = () => {
        console.log('clicked')
        removeCookies('authenticated');
        changeSecured(false)
    }
    if(!secured){
        return <Redirect to='/login'></Redirect>
    } else {
        return (
    <div>
    <Navbar className={classes.navBarDiv} >
        <Container className={classes.textColor}>
        <Navbar.Brand href="#home">
            CycleHub  Admin
        </Navbar.Brand>
        <Navbar.Brand className={'justify-content-end'}>
            <span onClick={logoutHandler} className={classes.logoutSpan}>LogOut</span>
        </Navbar.Brand>
        </Container>
    </Navbar>
    <div>
        <Row>
            <Col xs={ 3 } className={ classes.sidebar }>
                <Sidebar changeCurrentFunc = { changeCurrentFunc } currentFunc={currentFunc}></Sidebar>
            </Col>
                <Col xs={9} className={classes.adminDiv}>
                            
                {currentFunc === 'chart' && <Statics></Statics>}        
                { currentFunc === 'addAccess' && <AddAccess></AddAccess> }
                { currentFunc === 'addProduct' && <AddProduct></AddProduct>}
                { currentFunc === 'couponEdit' && <EditCoupons></EditCoupons> }
                { currentFunc === 'categoryEdit' &&  <EditCategories></EditCategories>}
                { currentFunc === 'brandNameEdit' && <BrandNameEdit></BrandNameEdit>}
                { currentFunc === 'accessCategoryEdit'&&<EditAccess></EditAccess>}      
                { currentFunc === 'editProduct' && <EditProduct></EditProduct>}
                { currentFunc === 'editAccess' && <EditAccess></EditAccess>}
                { currentFunc === 'userOrderTracker' && <UserOrderTracker></UserOrderTracker>}
                { currentFunc === 'orderReceived' && <OrderReceived></OrderReceived>}
                { currentFunc === 'orderStatusUpdate' && <OrderStatusUpdate></OrderStatusUpdate>}        
                { currentFunc === 'subAdmin' && <SubAdmin></SubAdmin>}
                { currentFunc === 'delivery' && <DeliveryAvail></DeliveryAvail>}
                { currentFunc ==='bulkUpload' && <BulkUpload></BulkUpload>}
                {currentFunc === 'productType' && <AddProductType></AddProductType>}
                {currentFunc === 'imgCustom' && <ImageCustomizer></ImageCustomizer>}
                {currentFunc === 'removeProduct' && <Remove></Remove>}
                {currentFunc === 'productStru' && <ProductStructure></ProductStructure>}
            </Col>
        </Row>
    </div>        
    </div>
    )   
    }
}

export default Admin
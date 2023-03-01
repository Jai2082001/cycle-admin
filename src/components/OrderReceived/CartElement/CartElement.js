import classes from './CartElement.module.css'


const CartElement = ({cart}) => { 

    console.log(cart)
    return (
        <div>
            
            {cart.map((item) => {
                return (
                    <div className={classes.imgDiv}>
                        <div className={classes.pContainer}>
                            <p>{ item.product.name }</p>
                            <p>{item.quantity}</p>
                        </div>
                        <div className={classes.imgContainer}>
                        <img src={item.product.displayimages} className={classes.imgClass} alt="" />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CartElement
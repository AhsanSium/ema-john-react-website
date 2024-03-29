import React from 'react';


const Cart = (props) => {
    const cart = props.cart
    //const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);
    //const total = cart.reduce((total, prd) => total + prd.price, 0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }
    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    } 
    if(total > 15) {
        shipping = 4.99;
    }
    else if(total > 0) {
        shipping = 12.99;
    }

    const tax = total / 10;

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return precision;
    }
    const grandTotal = total + tax + shipping;
    return (
        <div>
            <h4 className="">Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(total)} </p>
            <p><small>Shipping Cost : {formatNumber(shipping)}</small></p>
            <p><small>Tax Cost : {formatNumber(tax)}</small></p>
            <h5>Total Price: {formatNumber(grandTotal)}</h5>
            <br/>
            {props.children}
        </div>
    );
};

export default Cart;
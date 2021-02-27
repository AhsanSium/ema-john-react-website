import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const {img , name, seller, price, stock} = props.product;
    //console.log(props);
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br/>
                <p><small>by: {seller}</small></p>
                <p>Price: {price}</p>
                <p>Only {stock} left in Stock Order Soon</p>
                <button
                    onClick={() => props.handleAddProduct(props.product)}
                    className="main-btn"><FontAwesomeIcon icon={faShoppingCart} />  Add To Cart
                </button>
            </div>
        </div>
    );
};

export default Product;
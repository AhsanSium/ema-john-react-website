import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10)
    //console.log(fakeData);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        console.log('Product Added', product);
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                
                    {
                        products.map(product => <Product
                            handleAddProduct = {handleAddProduct}
                            product={product}></Product>)
                    }
                
            
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
                {/* <h3>this is cart</h3>
                <h5>Order Summary: {cart.length}</h5> */}
            </div>
        </div>
    );
};

export default Shop;
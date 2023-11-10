import React from 'react';
import '../Styles/Cart.css';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Cart = ({ cart, setCart }) => {
  if (!cart) {
    return <div>Loading...</div>; // You can customize the loading state according to your UI
  }

  const incQty = (product) => {
    const existingProduct = cart.find((x) => x.id === product.id);
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...existingProduct, qty: existingProduct.qty + 1 } : item
      )
    );
  };

  const decQty = (product) => {
    const existingProduct = cart.find((x) => x.id === product.id);
    if (existingProduct.qty > 1) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...existingProduct, qty: existingProduct.qty - 1 } : item
        )
      );
    }
  };

  const removeProduct = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.qty * item.price, 0);
  };

  return (
    <div className='cart'>
      <h3># Cart</h3>
      {cart.length === 0 ? (
        <div className='empty_cart'>
          <h2>Your Shopping cart is empty</h2>
          <Link to='/shop'>
            <button>Shop Now</button>
          </Link>
        </div>
      ) : (
        <div className='container'>
          {cart.map((product) => (
            <div className='box' key={product.id}>
              <div className='img_box'>
                <img src={product.image} alt={product.name} />
              </div>
              <div className='detail'>
                <div className='info'>
                  <h4>{product.cat}</h4>
                  <h3>{product.name}</h3>
                  <p>Price: ${product.price}</p>
                  <p>Total: ${product.qty * product.price}</p>
                </div>
                <div className='quantity'>
                  <button onClick={() => incQty(product)}>+</button>
                  <span>{product.qty}</span>
                  <button onClick={() => decQty(product)}>-</button>
                </div>
                <div className='icon'>
                  <button onClick={() => removeProduct(product)} >
                    <AiOutlineClose />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className='bottom'>
          <div className='Total'>
            <h4>Sub Total: ${calculateTotal()}</h4>
          </div>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;


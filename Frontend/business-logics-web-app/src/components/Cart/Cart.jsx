import React, { useState, useEffect, useContext } from 'react';
import AuthContext from 'Context/AuthProvider';
import CartContext from 'Context/CartProvider';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrder } from 'Services/orderService';
import { Blocks } from 'react-loader-spinner';

export const Cart = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { auth } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);

  useEffect(() => {
    const cartStorage = getCartStorage();
    setCartItems(cartStorage);
  }, []);

  const getCartStorage = () => {
    const cart = localStorage.getItem('cart-storage');
    let updatedCart = [];
    if (cart) {
      updatedCart = JSON.parse(cart);
    }
    return updatedCart;
  }

  const handleEditQuantity = (itemId, newQuantity) => {
    setCartItems(prevCartItems => prevCartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantityOfChoices: newQuantity };
      }
      return item;
    }));
  };

  const handleRemoveItem = (itemId) => {
    const list = cartItems.filter(item => item.id !== itemId);
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== itemId));
    if (list.length) {
      localStorage.setItem('cart-storage', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart-storage');
    }
    setCart({ numberOfProduct: list.length });
  };

  const handleEditCart = () => {
    localStorage.setItem('cart-storage', JSON.stringify(cartItems));
  }

  const getProductIntegerPart = (price) => {
    return Math.floor(price).toString();
  }

  const getProductDecimalPart = (price) => {
    const decimalPart = price % 1;
    return decimalPart ? decimalPart.toFixed(2).split('.')[1] : '00';
  }

  const handleCheckboxChange = (itemId) => {
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter(id => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const handleBuy = async () => {
    if (!auth || !auth.isAuthenticated) {
      toast.error('You need to log in first to check out the cart!');
    } else {
      const purchaseOrderDetails = [];
      let subtotal = 0;
      let discount = 0;
      let totalAmount = 0;

      for (const itemId of selectedItems) {
        const selectedItem = cartItems.find(item => item.id === itemId);
        if (selectedItem) {
          const item = {
            "productId": selectedItem.id,
            "quantity": selectedItem.quantityOfChoices,
            "unitPrice": selectedItem.price - selectedItem.discount,
            "totalPrice": (selectedItem.price - selectedItem.discount) * selectedItem.quantityOfChoices
          };
          purchaseOrderDetails.push(item);
          subtotal += selectedItem.price * selectedItem.quantityOfChoices;
          discount += selectedItem.discount * selectedItem.quantityOfChoices;
          totalAmount += (selectedItem.price - selectedItem.discount) * selectedItem.quantityOfChoices;
        }
      }
      const payload = {
        "userId": auth.id,
        "subtotal": subtotal,
        "discount": discount,
        "totalAmount": totalAmount,
        "status": "pending",
        "purchaseOrderDetails": purchaseOrderDetails
      };
      try {
        setIsLoading(true);
        const res = await createOrder(payload);
        if (res.status === 204) {
          toast.success('Create order successful!!!');
          selectedItems.forEach(x => handleRemoveItem(x));
          setSelectedItems([]);
          navigate('/my-order');
        }
      } catch (error) {
        toast.error(error.response.data);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        return total + ((item.price - item.discount) * item.quantityOfChoices);
      }
      return total;
    }, 0);
  };

  return (
    <div className='cart container p-3'>
      <h1>Cart Management</h1>
      {isLoading && <Blocks
        height="200"
        width="200"
        color="blue"
        ariaLabel="loading"
      />}
      {!cartItems.length && !isLoading && (
        <>
          <div className='d-flex justify-content-center'>
            <div>Your cart is empty, <Link to={'/'}>Continue Shopping.</Link></div>
          </div>
        </>
      )}
      {cartItems.length > 0 && !isLoading && (
        <>
          <div className="items-list">
            {cartItems.map(item => (
              <div key={item.id} className="item">
                <div className="row">
                  <div className='col-1'>
                    <input
                      type="checkbox"
                      className='selected-checkbox'
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </div>
                  <div className="col-3">
                    <div className="item-pic">
                      <img src={require('Assets/Images/Logo/CartLogo.png')} className="img-item" alt="product" />
                    </div>
                  </div>
                  <div className="col-8 pl-0 position-relative">
                    <span className="item-name">{item.name}</span>
                    <br></br>
                    <span>Quantity:</span>
                    <input
                      type="number"
                      min="1"
                      max={item.quantity}
                      value={item.quantityOfChoices}
                      onChange={(e) => handleEditQuantity(item.id, parseInt(e.target.value))}
                    />
                    <br></br>
                    {item.quantity > 1 && (
                      <small>Have {item.quantity} items in our store</small>

                    )}
                    {item.quantity === 1 && (
                      <small>Only have 1 item in our store</small>
                    )}
                    {item.discount && (
                      <div className="product-price">
                        $<span className="integer-part">{getProductIntegerPart(item.price - item.discount)}</span>
                        .<span className="decimal-part">{getProductDecimalPart(item.price - item.discount)}</span>
                        <span className="discounted">List: <b className="price-discounted">${item.price.toFixed(2)}</b></span>
                      </div>
                    )}
                    {!item.discount && (
                      <div className="product-price">
                        $<span className="integer-part">{getProductIntegerPart(item.price)}</span>
                        .<span className="decimal-part">{getProductDecimalPart(item.price)}</span>
                      </div>
                    )}
                    <div className="item-total">
                      <b>Total: </b>
                      $<span className="integer-part">{getProductIntegerPart((item.price - item.discount) * item.quantityOfChoices)}</span>
                      .<span className="decimal-part">{getProductDecimalPart((item.price - item.discount) * item.quantityOfChoices)}</span>
                    </div>
                    <span className="item-remove" onClick={() => handleRemoveItem(item.id)}><i className="bi bi-trash3"></i></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='row'>
            <div className="col-md-12 total-price my-2">
              <h3 className='float-end'>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
            </div>
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary float-end m-2" onClick={handleBuy} disabled={!selectedItems.length}>Checkout</button>
              <button type="submit" className="btn btn-primary float-end m-2" onClick={handleEditCart}>Edit</button>
              <Link to={'/'}><button type="submit" className="btn btn-primary float-end m-2">Continue Shopping</button></Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

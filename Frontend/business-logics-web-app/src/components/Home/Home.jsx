/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef, useContext } from 'react';
import './Home.css';
import { Link, useLocation } from 'react-router-dom';
import { FilterAdvance } from './FilterAdvance/FilterAdvance';
import { getProducts } from 'Services/productService';
import CartContext from 'Context/CartProvider';
import { Blocks } from 'react-loader-spinner';
import { toast } from 'react-toastify';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get('search');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const initialized = useRef(false);
  const { setCart } = useContext(CartContext);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await getProducts(searchText ?? '', 0, 10);
      if (res.status === 200) {
        const productsWithQuantity = res.data.map(product => ({ ...product, quantityOfChoices: 1 }));
        setFilteredProducts(productsWithQuantity);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const addToCart = (product) => {
    const cart = localStorage.getItem('cart-storage');
    let updatedCart = [];
    if (cart) {
      updatedCart = JSON.parse(cart);
    }
    const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      if (updatedCart[existingItemIndex].quantityOfChoices + product.quantityOfChoices > product.quantity) {
        updatedCart[existingItemIndex].quantityOfChoices = product.quantity;
      } else {
        updatedCart[existingItemIndex].quantityOfChoices += product.quantityOfChoices;
      }
    } else {
      updatedCart.push({ ...product, quantityOfChoices: product.quantityOfChoices });
    }
    localStorage.setItem('cart-storage', JSON.stringify(updatedCart));
    setCart({ numberOfProduct: updatedCart.length });
    toast.info('Added: ' + product.name)
  };

  const getProductIntegerPart = (price) => {
    return Math.floor(price).toString();
  }

  const getProductDecimalPart = (price) => {
    const decimalPart = price % 1;
    return decimalPart ? decimalPart.toFixed(2).split('.')[1] : '00';
  }

  const handleEditQuantity = (itemId, newQuantity) => {
    console.log(newQuantity);
    setFilteredProducts(prevCartItems => prevCartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantityOfChoices: newQuantity };
      }
      return item;
    }));
  };

  return (
    <div className="mt-2">
      <div className="row m-0">
        <div className="col-lg-2">
          <div className="container">
            <FilterAdvance />
          </div>
        </div>
        <div className="col-lg-10">
          {isLoading && <Blocks
            height="200"
            width="200"
            color="blue"
            ariaLabel="loading"
          />}
          {!filteredProducts.length && !isLoading && (
            <h1>No result</h1>
          )}
          {filteredProducts.length > 0 && !isLoading && (
            <>
              <h4>Results</h4>
              <span>Price and other details may vary based on product size and color.</span>
              <div className="product-list">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-item">
                    <Link to={`/product/${product.id}`}>
                      <img src={require('Assets/Images/Logo/CartLogo.png')} alt={product.name} className="product-item-img" />
                    </Link>
                    <div className="product-details">
                      <h3 className="product-title">{product.name}</h3>
                      <span>{product.description}</span>
                      <div className="star-rating">
                        {product.rating}
                        {Array.from({ length: 5 }, (_, i) => (
                          <span
                            key={i}
                            className={`star ${i <= product.rating ? 'filled' : ''}`}
                            title={`${product.rating} out of 5`}
                          >
                            &#9733;
                          </span>
                        ))}
                        <a href="#" className="review" title="Reviewed">{product.numberOfReviews}</a>
                      </div>
                      <p>700+ bought in past month</p>
                      {product.discount && (
                        <div className="product-price">
                          $<span className="integer-part">{getProductIntegerPart(product.price - product.discount)}</span>
                          .<span className="decimal-part">{getProductDecimalPart(product.price - product.discount)}</span>
                          <span className="discounted">List: <b className="price-discounted">${product.price.toFixed(2)}</b></span>
                        </div>
                      )}
                      {!product.discount && (
                        <div className="product-price">
                          $<span className="integer-part">{getProductIntegerPart(product.price)}</span>
                          .<span className="decimal-part">{getProductDecimalPart(product.price)}</span>
                        </div>
                      )}
                      <div className='float-end'>
                        {product.quantity > 0 && (<>
                          <input type='number' className='quantity-product' min="1" max={product.quantity} defaultValue="1"
                          onChange={(e) => handleEditQuantity(product.id, parseInt(e.target.value))} />
                          <button className='btn btn-sm btn-success' onClick={() => addToCart(product)}><i className="bi bi-cart-plus-fill"></i>Add</button>
                          <button className='btn btn-sm btn-danger ms-1'>Buy Now</button>
                        </>)
                        }
                        {product.quantity === 0 && (<>
                          <h3 className='text-danger'>Out of stock</h3>
                        </>)
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link active" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import './Home.css';
import { FilterAdvance } from './FilterAdvance/FilterAdvance';
import { getProducts } from 'Services/productService';

export const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts('', 0, 10);
      if (res.status === 200) {
        setFilteredProducts(res.data);
        console.log(filteredProducts);

      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getProductIntegerPart = (price) => {
    return Math.floor(price).toString();
  }

  const getProductDecimalPart = (price) => {
    const decimalPart = price % 1;
    return decimalPart ? decimalPart.toFixed(2).split('.')[1] : '00';
  }

  return (
    <div className="mt-2">
      <div className="row m-0">
        <div className="col-2">
          <div className="container">
            <FilterAdvance />
          </div>
        </div>
        <div className="col-10">
          {!filteredProducts.length && (
            <h1>No result</h1>
          )}
          {filteredProducts.length > 0 && (
            <>
              <h4>Results</h4>
              <span>Price and other details may vary based on product size and color.</span>
              <div className="product-list">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-item">
                    <img src={require('../../Assets/Images/Logo/CartLogo.png')} alt={product.name} className="product-item-img" />
                    <div className="product-details">
                      <h3 className="product-title">{product.name}</h3>
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
                          <span className="decimal-part">{getProductDecimalPart(product.price)}</span>
                          <span className="discounted">List: <b className="price-discounted">${product.price}</b></span>
                        </div>
                      )}
                      {!product.discount && (
                        <div className="product-price">
                          $<span className="integer-part">{getProductIntegerPart(product.price)}</span>
                          <span className="decimal-part">{getProductDecimalPart(product.price)}</span>
                        </div>
                      )}
                      <div className='float-end'>
                        <input type='number' className='quantity-product' min="1" max="999"/>
                        <button className='btn btn-success'><i className="bi bi-cart-plus-fill"></i>Add</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>

          )}
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

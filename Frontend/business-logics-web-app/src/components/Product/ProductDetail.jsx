import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { getProduct } from 'Services/productService';
import { Blocks } from 'react-loader-spinner';
import { toast } from 'react-toastify';

export const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await getProduct(id);
        if (response.status === 200) {
          console.log(response.data);
          setProduct(response.data);
        } else {
          toast.error('Failed to fetch product');
        }
      } catch (error) {
        toast.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading && <Blocks
        height="200"
        width="200"
        color="blue"
        ariaLabel="loading"
      />}
      {!isLoading && product && (
        <div className="container p-5">
          <h1><Link onClick={handleGoBack}><i className='bi bi-arrow-left-square-fill mx-3'></i></Link> Product Detail</h1>
          <div className="product-info">
            <div className='row'>
              <div className="col-md-4">
                <img src={require('Assets/Images/Logo/CartLogo.png')} alt="" className="product-item-img" />
              </div>
              <div className="col-md-8">
                <p><span>ID:</span> {product.id}</p>
                <p><span>Name:</span> {product.name}</p>
                <p><span>Category:</span> {product.category}</p>
                <p><span>Description:</span> {product.description}</p>
                <p><span>Brand:</span> {product.brand}</p>
                <p><span>Author:</span> {product.author}</p>
                <p><span>Price:</span> ${product.price}</p>
                <p><span>Quantity:</span> {product.quantity}</p>
                <p><span>Discount:</span> ${product.discount}</p>
                <p><span>Rating:</span> {product.rating}</p>
                <p><span>Number of Reviews:</span> {product.numberOfReviews}</p>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary float-end m-2">Review</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './OrderDetail.css';
import { Blocks } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { getOrder } from 'Services/orderService';

export const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setIsLoading(true);
        const response = await getOrder(id);
        if (response.status === 200) {
          setOrder(response.data);
        } else {
          toast.error('Failed to fetch order detail: ' + response.data);
        }
      } catch (error) {
        toast.error('Error fetching order detail: ' + error.response.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetail();
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
      {order && (
        <div className="order-detail container p-3">
          <h1><Link onClick={handleGoBack}><i className='bi bi-arrow-left-square-fill mx-3'></i></Link>Order Detail</h1>
          <div className="order-info mt-3">
            <p><strong>User ID:</strong> {order.userId}</p>
            <p><strong>Order Date:</strong> {order.orderDate}</p>
            <p><strong>Subtotal:</strong> ${order.subtotal.toFixed(2)}</p>
            <p><strong>Discount:</strong> ${order.discount.toFixed(2)}</p>
            <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
          <h3>Purchase Order Details</h3>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Discount</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.purchaseOrderDetails.map(detail => (
                <tr key={detail.id}>
                  <td>{detail.productId}</td>
                  <td><Link to={`/product/${detail.productId}`}>{detail.product.name}</Link></td>
                  <td>${detail.product.discount.toFixed(2)}</td>
                  <td>${detail.unitPrice.toFixed(2)}</td>
                  <td>{detail.quantity}</td>
                  <td>${detail.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
              <tr >
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><b>Total:</b> </td>
                <td><b>${order.totalAmount.toFixed(2)}</b></td>
              </tr>
            </tbody>
          </table>
          <div className='row'>
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary float-end m-2">Checkout</button>
              <button type="submit" className="btn btn-primary float-end m-2"><i className='bi bi-cart-x'></i>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

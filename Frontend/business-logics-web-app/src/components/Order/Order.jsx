import { getOrders } from 'Services/orderService';
import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Blocks } from 'react-loader-spinner';
import './Order.css';
import { Link } from 'react-router-dom';

export const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const totalSubtotal = orders.reduce((total, order) => total + order.subtotal, 0).toFixed(2);
  const totalDiscount = orders.reduce((total, order) => total + order.discount, 0).toFixed(2);
  const totalAmount = orders.reduce((total, order) => total + order.totalAmount, 0).toFixed(2);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getOrders(0, 10);
      if (res.status === 200) {
        setOrders(res.data);
      }
    } catch (error) {
      toast.error('Fetch data error!');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='container'>
        {isLoading && <Blocks
          height="200"
          width="200"
          color="blue"
          ariaLabel="loading"
        />}
        {!isLoading && (
          <div className='p-3'>
            <h2>Order List</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>OrderId</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Products</th>
                  <th>Subtotal</th>
                  <th>Discount</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.id}</td>
                    <td>{order.status}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.purchaseOrderDetails.length}</td>
                    <td>${order.subtotal.toFixed(2)}</td>
                    <td>${order.discount.toFixed(2)}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td><Link to={`/order-detail/${order.id}`}>See detail</Link></td>
                  </tr>
                ))}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><b>Total: </b></td>
                    <td><b>${totalSubtotal}</b></td>
                    <td><b>${totalDiscount}</b></td>
                    <td><b>${totalAmount}</b></td>
                    <td></td>
                  </tr>
              </tbody>
            </table>
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
          </div>
        )}
      </div>

    </>
  );
}

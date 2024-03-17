import './App.css';
import { Home } from './components/Home/Home';
import { LoginForm } from './components/LoginForm/LoginForm';
import { Registration } from './components/Registration/Registration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "bootstrap-icons/font/bootstrap-icons.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { NavBar } from 'components/NavBar/NavBar';
import { Profile } from 'components/Profile/Profile';
import { NotFound } from 'components/Shared/NotFound';
import { Cart } from 'components/Cart/Cart';
import { Order } from 'components/Order/Order';
import { OrderDetail } from 'components/OrderDetail/OrderDetail';
import { ProductDetail } from 'components/Product/ProductDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/registration' element={<Registration />}></Route>
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/my-order' element={<Order />}></Route>
          <Route path='/order-detail/:id' element={<OrderDetail />}></Route>
          <Route path='/product/:id' element={<ProductDetail />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        pauseOnHover
        draggable/>
    </>
  );
}

export default App;

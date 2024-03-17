/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { toast } from 'react-toastify';
import { loginUser } from 'Services/userService';
import AuthContext from 'Context/AuthProvider';
import { Blocks } from 'react-loader-spinner';

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const registrationSuccess = searchParams.get('registrationSuccess');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (registrationSuccess === 'true') {
      toast.success('Registration successful!');
    }
  }, [registrationSuccess]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(email) || !email) {
      toast.error('Email is invalid!');
      return;
    }

    if (!password) {
      toast.error('Password is invalid!');
      return;
    }

    try {
      setIsLoading(true);
      const res = await loginUser(email, password);
      if (res.status === 200) {
        localStorage.setItem('accessToken', res.data.tokenViewModel.accessToken);
        localStorage.setItem('refreshToken', res.data.tokenViewModel.refreshToken);
        const dataLogin = {
          isAuthenticated: true,
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          address: res.data.user.address,
          phoneNumber: res.data.user.phoneNumber,
        }
        setAuth(dataLogin);
        navigate('/');
        toast.success(res.data.tokenViewModel.statusMessage);
        if (rememberMe) {
          // TODO Remember Me
        }
      }
    } catch (error) {
      toast.error(error.response.data.statusMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    if (!email) {
      return true;
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(String(email).toLowerCase());
    return result;
  };

  const handlePressEnter = (event) => {
    if (event.charCode === 13) {
      handleSubmit(event);
    }
  }

  return (
    <>
      {isLoading && <Blocks
        height="100"
        width="100"
        color="blue"
        ariaLabel="loading"
        wrapperClass="loading-container"
      />}
      <div className="login-page bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 mt-3">
              <h3 className="mb-3">Login Now</h3>
              <div className="bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <form onSubmit={handleSubmit} className="row g-4">
                        <div className="col-12">
                          <label>Email<span className="text-danger">*</span></label>
                          <div className="input-group">
                            <div className="input-group-text"><i className="bi bi-person-fill"></i></div>
                            <input type="email" className="form-control" placeholder="Enter Email"
                              value={email} onChange={(e) => setEmail(e.target.value)} />
                          </div>
                        </div>

                        <div className="col-12">
                          <label>Password<span className="text-danger">*</span></label>
                          <div className="input-group">
                            <div className="input-group-text">
                              <i className="bi bi-lock-fill"></i>
                            </div>
                            <input type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Enter Password"
                              value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={(event) => handlePressEnter(event)} />
                            <div className="input-group-text cursor-pointer" onClick={handleTogglePassword}>
                              <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`} />
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                              id="inlineFormCheck" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}
                            />
                            <label className="form-check-label" htmlFor="inlineFormCheck">
                              Remember me
                            </label>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <a href="#" className="float-end text-primary">Forgot password?</a>
                        </div>

                        <div className="col-12">
                          <button type="submit" className="btn btn-primary px-4 float-end mt-4">
                            Login
                          </button>
                        </div>
                      </form>
                      <div className="col-12">
                        <Link to={'/registration'}>Signup now {registrationSuccess}</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 ps-0 d-none d-md-block">
                    <div className="form-right h-100 bg-primary text-white text-center pt-5">
                      <i className="bi bi-cart"></i>
                      <h2 className="fs-1">Welcome Back!!!</h2>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-end text-secondary mt-3">Tran Van Bao Thien Page Design</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

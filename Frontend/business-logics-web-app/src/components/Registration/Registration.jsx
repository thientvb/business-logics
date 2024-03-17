import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registration.css';
import { toast } from 'react-toastify';
import { registerNewUser } from 'Services/userService';
import { useNavigate } from 'react-router-dom';
import { Blocks } from 'react-loader-spinner';

export const Registration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [errorPasswords, setErrorPasswords] = useState([]);

  const handleChange = (event) => {
    setErrorPasswords([]);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        setIsLoading(true);
        const res = await registerNewUser(formData.name, formData.email, formData.phoneNumber, formData.address, formData.password, formData.confirmPassword);
        navigate('/login?registrationSuccess=true');
        toast.success(res.data.message[0]);
      } catch (error) {
        if (error.response.data.length > 0) {
          setErrorPasswords(error.response.data)
          for (const e of error.response.data) {
            toast.error(e);
          }
        }
      } finally {
        setIsLoading(false);
      }
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

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    if (!email || !validateEmail(email)) {
      console.error('Invalid email address!');
      toast.error('Invalid email address!');
      return false;
    }
    
    if (!name) {
      console.error('Name is required!');
      toast.error('Name is required!');
      return false;
    }
    
    if (!password) {
      console.error('Passwords is required!');
      toast.error('Passwords is required!');
      return false;
    }

    if (password && password !== confirmPassword) {
      console.error('Passwords do not match!');
      toast.error('Invalid email address!');
      return false;
    }

    return true;
  }

  return (
    <>
    {isLoading && <Blocks
        height="80"
        width="80"
        radius="9"
        color="blue"
        ariaLabel="loading"
        wrapperClass="loading-container"
      />}
      <div className="registration-page container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="signup-form">
              <form onSubmit={handleSubmit} className="mt-2 border p-4 bg-light shadow">
                <h4 className="mb-3 text-secondary">Create Your Account</h4>
                <div className="row">
                  <div className="mb-3 col-md-12">
                    <label htmlFor="email">Email<span className="text-danger">*</span></label>
                    <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email" onChange={handleChange} maxLength={100} />
                    {!validateEmail(formData.email) && <span className="text-danger">Please enter a valid email address.</span>}
                  </div>

                  <div className="mb-3 col-md-12">
                    <label htmlFor="name">Name<span className="text-danger">*</span></label>
                    <input type="text" id="name" name="name" className="form-control" placeholder="Enter Name" onChange={handleChange} maxLength={200} />
                  </div>

                  <div className="mb-3 col-md-12">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" className="form-control" placeholder="Enter Address" onChange={handleChange} maxLength={200} />
                  </div>

                  <div className="mb-3 col-md-12">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" className="form-control" placeholder="Enter Phone Number" onChange={handleChange} maxLength={10} />
                  </div>

                  <div className="mb-3 col-md-12">
                    <label htmlFor="password">Password<span className="text-danger">*</span></label>
                    <div className="input-group">
                      <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="form-control" placeholder="Enter Password" onChange={handleChange} maxLength={50} />
                      <div className="input-group-text cursor-pointer" onClick={handleTogglePassword}>
                        <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`} />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 col-md-12">
                    <label htmlFor="confirmPassword">Confirm Password<span className="text-danger">*</span></label>
                    <div className="input-group">
                      <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" className="form-control" placeholder="Confirm Password" onChange={handleChange} maxLength={50} />
                      <div className="input-group-text cursor-pointer" onClick={handleToggleConfirmPassword}>
                        <i className={`bi ${showConfirmPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`} />
                      </div>
                    </div>
                  </div>
                  {errorPasswords.length > 0 && (
                    <ul className="text-danger">
                      {errorPasswords.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  )}
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary float-end" disabled={!validateEmail(formData.email) || !formData.email}>Signup Now</button>
                  </div>
                </div>
              </form>
              <p className="text-center mt-3 text-secondary">If you have account, Please <Link to={'/login'}>Login Now</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

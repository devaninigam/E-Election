import logo from './User/User-tool/image/e-election-vertical.png';
import formlogo from './User/User-tool/image/form logo.png';
import './User/User-tool/User.css';
import './User/User-tool/userResponsive.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ADMIN_LOGIN, BASE_URL } from '../Redux-saga/constant';
import Cookies from 'js-cookie';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import FullPageLoader from './FullPageLoader/FullPageLoader';

const AdminLogin = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    console.log('field: ', field);
    console.log('errors[field]: ', errors, errors[field]);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (field === 'name') setName(value);
    if (field === 'password') setPassword(value);
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    const data = { name, password };

    try {
      setLoading(true);
      const res = await axios.post(BASE_URL + ADMIN_LOGIN, data);
      Cookies.set("role", res.data.data.role, { path: "/" });
      Cookies.set("name", res.data.data.name, { path: "/" });

      // 🔴 Dispatch event to update role instantly
      window.dispatchEvent(new Event("roleChanged"));
      MySwal.fire({
        title: 'Success',
        text: 'Login successful!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate('/');
      });

    } catch (err) {
      setLoading(false);
      setErrors({ api: err.response?.data?.message || 'Invalid credentials, please try again.' });
    }
  };

  return (
    <>
      {loading && <FullPageLoader />}
      <div className='row user-login'>
        <div className='col-6 l-1 e-logo'>
          <img src={logo} className='w-25' alt='e-election-vertical-logo' />
        </div>
        <div className='col-6 e-form e-logo'>
          <div className='form'>
            <center>
              <div className='mb-3 formlogo'>
                <img src={formlogo} alt="Form Logo" />
              </div>
            </center>
            <p>Admin Login</p>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder='Username'
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder='Password'
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
            {errors.api && <div className="alert alert-danger mt-3">{errors.api}</div>}
            <button
              className='btn w-100 btn-primary'
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <Link className='login-text-send' to={"/"}>User Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;

import React, { useRef } from 'react'
import logo from './User/User-tool/image/e-election-vertical.png'
import formlogo from './User/User-tool/image/form logo.png'
import "./User/User-tool/User.css"
import './User/User-tool/userResponsive.css'
import axios from 'axios'
import { BASE_URL, USER_LOGIN } from '../Redux-saga/constant'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const UserLogin = () => {

    const MySwal = withReactContent(Swal);

    const cardNo = useRef()
    const password = useRef()

    const handleLogin = () => {
        const data = {
            cardNo: cardNo.current.value,
            password: password.current.value
        };

        axios.post(BASE_URL + USER_LOGIN, data)
            .then((res) => {
                Cookies.set("role", res.data.data.role);
                Cookies.set("_id", res.data.data._id);
                Cookies.set("name", res.data.data.name)
                Cookies.set("cardNo", res.data.data.cardNo)
                window.location = '/';
            })
            .catch((error) => {
                MySwal.fire({
                    title: "Your Information Is Not Valid !",
                    icon: 'info',
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = "/";
                    }
                });
            });
    };

    return (
        <>
            <div className='row user-login'>
                <div className='col-6 l-1 e-logo'>
                    <img src={logo} className='w-25' alt='e-election-vertical-logo' />
                </div>
                <div className='col-6 e-form e-logo'>
                    <div className='form'>
                        <center>
                            <div className='mb-3 formlogo'>
                                <img src={formlogo} />
                            </div>
                        </center>
                        <p>User Login</p>

                        <div className="form-group">
                            <label>Voter Id</label>
                            <input type="text" ref={cardNo} className="form-control" placeholder="Enter Your Voter Id" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" ref={password} className="form-control" placeholder="Password" />
                        </div>
                        <button className="btn w-100 btn-primary" onClick={handleLogin}>LogIn</button>
                        <Link className='login-text-send' to={"/admin"}>Admin Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLogin
import React, { useState, useEffect } from 'react';
import logo from '../User/User-tool/image/e-election-horizontal.png';
import user from '../User/User-tool/image/user.png';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const name = Cookies.get("name")
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <nav className="navbar user-nav navbar-expand-lg w-100 navbar-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="Logo" width="130" height="30" className="d-inline-block align-text-top" />
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id='navbarSupportedContent'>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className='nav-item'>
                                <a className='nav-link active'>{currentTime.toLocaleDateString()}</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link active'>{currentTime.toLocaleTimeString()}</a>
                            </li>
                            <li className="nav-item">
                                <Link to={"/"}><a className="nav-link active">Voting</a></Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to={"/profile"}><img className='user-img' src={user} alt="User" /></Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"profile"}><a className="nav-link active">Hello {name}</a></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;

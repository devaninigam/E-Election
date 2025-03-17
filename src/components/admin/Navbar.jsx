import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import side_logo from "./admin-tool/img/side-logo.png";
import Admin_logo from "./admin-tool/img/Admin-img.png";
import Cookies from 'js-cookie';

function Navbar() {
  const MySwal = withReactContent(Swal);

  const handleLogout = () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("role");
        Cookies.remove("name");
        window.location = "/";
      }
    });
  };

  return (
    <nav style={{ height: "81px" }} className="navbar admin-navbar navbar-expand-lg w-100 navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={side_logo} alt="Logo" width="130" height="30" className="d-inline-block align-text-top" />
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse justify-content-end" id='navbarSupportedContent'>
          <ul style={{ transform: "scale(0.8)" }} className="navbar-nav mb-2 mb-lg-0  d-flexn align-items-center">
            <li className="nav-item">
              <Link className='nav-text-link' aria-current="page" to={"/electionselect"} ><img src={Admin_logo} alt="Admin" className='ms-2' /></Link>
            </li>
            <li className="nav-item">
              <Link className='nav-text-link' style={{ padding: "20px", textTransform: "capitalize" }} aria-current="page" to={"/electionselect"} >{Cookies.get("name")}</Link>
            </li>
            <button className='logout ' onClick={handleLogout}>Logout</button>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

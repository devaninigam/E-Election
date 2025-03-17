import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import SideNavbar from './SideNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_PARTY_PROGRESS, GET_PARTY_PROGRESS, POST_PARTY_PROGRESS } from '../../Redux-Saga/Admin_Code/Admin/Partys/action/action';
import Swal from 'sweetalert2';
function Election_Partys() {
  const [party_name, setparty_name] = useState("")
  const [party_logo, setparty_logo] = useState("")
  const [short_code, setshort_code] = useState("")

  const [validation, setValidation] = useState({
    party_name: '',
    party_logo: '',
    short_code: '',
  });

  const dispatch = useDispatch();
  const api = useSelector(state => state.PartyReducer.PartyData);

  useEffect(() => {
    dispatch({ type: GET_PARTY_PROGRESS });

  }, []);
  const partyAdd = (e) => {
    const formData = new FormData();

    // VALIDATION PARTY NAME
    if (party_name.trim() === "") {
      setValidation((rest) => ({
        ...rest,
        party_name: "Enter Party Name",
      }));
    } else {
      formData.append("party_name", party_name);
    }

    // VALIDATION PARTY LOGO
    if (!party_logo) {
      setValidation((rest) => ({
        ...rest,
        party_logo: "Select Party Logo",
      }));
    } else {
      formData.append("party_logo", party_logo);
    }

    // VALIDATION SHORT CODE
    if (short_code.trim() === "" || short_code.length < 3) {
      setValidation((rest) => ({
        ...rest,
        short_code: "Enter Party Short Code (Minimum 3 characters)",
      }));
    } else {
      formData.append("short_code", short_code.trim());
    }

    // If all validations pass, dispatch the form data 
    if (party_name && party_logo && short_code.trim()) {
      dispatch({ type: POST_PARTY_PROGRESS, payload: formData })

      // Show success alert
      //   Swal.fire({
      //     icon: 'success',
      //     title: 'Election-Party Added Successfully!',
      //     html: `<p>Election-Party Name: ${party_name}</p><p>Party Short Code: ${short_code}</p>`,
      //     showConfirmButton: false,
      //     timer: 1500,
      //   }).then(() => {
      //     window.location.reload();
      //   });
      // } else {
      //   // Show error alert
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: 'Please fill in all the required fields!',
      //   });
    }
  };

  const partyDelete = (id) => {
    console.log('id: ', id);
    dispatch({ type: DELETE_PARTY_PROGRESS, payload: id })
  }

  return (
    <>
      <div className=''>
        <div className='row'>
          <Navbar />
          <SideNavbar />
          <div className='col-9'>
            <div className="container-p ">
              <table style={{ transform: "scale(0.9)" }} className="table">
                <tr>
                  <th className='thead border border-1 border-dark' scope="col">No.</th>
                  <th className='thead border border-1 border-dark' scope="col">E-Election Party Name</th>
                  <th className='thead border border-1 border-dark' scope="col">E-Election Party Logo</th>
                  <th className='thead border border-1 border-dark' scope="col">E-Election Party Short Code</th>
                  <th className='thead border border-1 border-dark' scope="col">Action</th>

                </tr>
                <tbody>
                  {api?.map((item, index) => (
                    <tr className='p-2' key={index}>
                      <th className='tdata top-pading'>{index + 1}</th>
                      <td className='tdata top-pading'>{item?.party_name}</td>
                      <td className='tdata partylogo-1'>
                        <img src={item?.party_logo} className='partylogo' alt={`${item?.party_name}'s logo`} />
                      </td>
                      <td className='tdata top-pading'>{item?.short_code}</td>
                      <td className='tdata'>
                        <button className="smoll-btn delete" onClick={() => partyDelete(item?._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <center>
              <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className='smoll-btn'>ADD</button>
            </center>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade " id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" >
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 " id="exampleModalLabel">Create E-Election Party</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <form enctype="multipart/form-data" >
              <div className="modal-body">
                <label >E-Election Party Name</label>
                <div className="input-group mb-3 mt-2 ">
                  <input
                    type="text"
                    className={`form-control ${validation.party_name ? 'is-invalid' : ''}`}
                    placeholder="E-Election Party Name"
                    name="party_name"

                    onChange={(e) => setparty_name(e.target.value)}
                  />
                  {validation.party_name && <div className="invalid-feedback">{validation.party_name}</div>}
                </div>
                <label >E-Election Party Logo </label>
                <div className="input-group mb-3 mt-2 ">
                  <input
                    type="file"
                    name="party_logo"
                    accept=".png"
                    className={`form-control ${validation.party_logo ? 'is-invalid' : ''}`}
                    onChange={(e) => setparty_logo(e.target.files[0])}
                    placeholder="E-Election Party Logo"
                  />
                  {validation.party_logo && <div className="invalid-feedback">{validation.party_logo}</div>}
                </div>
                <label >E-Election Party Short Code </label>
                <div className="input-group mb-3 mt-2 ">
                  <input
                    type="text"
                    className={`form-control ${validation.short_code ? 'is-invalid' : ''}`}
                    placeholder="E-Election Party Short Code"
                    name="short_code"

                    onChange={(e) => setshort_code(e.target.value)}
                  />
                  {validation.short_code && <div className="invalid-feedback">{validation.short_code}</div>}
                </div>
              </div>
            </form>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={partyAdd} type="button" className="btn p-color">ADD</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Election_Partys;

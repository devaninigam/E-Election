import React, { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar';
import SideNavbar from './SideNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_PARTY_PROGRESS, GET_PARTY_PROGRESS, POST_PARTY_PROGRESS } from '../../Redux-Saga/Admin_Code/Admin/Partys/action/action';
import Swal from 'sweetalert2';

function ElectionParties() {
  const [formData, setFormData] = useState({ party_name: '', party_logo: null, short_code: '' });
  const [validation, setValidation] = useState({});
  const fileInputRef = useRef(null); // Ref for file input

  const dispatch = useDispatch();
  const parties = useSelector(state => state.PartyReducer.PartyData);

  useEffect(() => {
    dispatch({ type: GET_PARTY_PROGRESS });
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.party_name.trim()) errors.party_name = "Enter Party Name";
    if (!formData.party_logo) errors.party_logo = "Select Party Logo";
    if (!formData.short_code.trim() || formData.short_code.length < 3) {
      errors.short_code = "Enter Party Short Code (Minimum 3 characters)";
    }
    setValidation(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddParty = () => {
    if (!validateForm()) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please fill in all the required fields!' });
      return;
    }

    const submissionData = new FormData();
    Object.keys(formData).forEach(key => submissionData.append(key, formData[key]));

    dispatch({ type: POST_PARTY_PROGRESS, payload: submissionData });
    Swal.fire({
      icon: 'success',
      title: 'Election-Party Added Successfully!',
      html: `<p>Election-Party Name: ${formData.party_name}</p><p>Party Short Code: ${formData.short_code}</p>`,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      document.getElementById("exampleModal").classList.remove("show");
      document.body.classList.remove("modal-open");
      document.querySelector(".modal-backdrop").remove();

      setFormData({ party_name: '', party_logo: null, short_code: '' });

      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
    });
  };

  const handleDeleteParty = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: DELETE_PARTY_PROGRESS, payload: id });
        Swal.fire("Deleted!", "The party has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <div className='row'>
        <Navbar />
        <SideNavbar />
        <div className='col-9'>
          <div className="container-p set-scroll">
            <table style={{ transform: "scale(0.9)" }} className="table">
              <thead>
                <tr>
                  <th className='thead border border-1 border-dark'>No.</th>
                  <th className='thead border border-1 border-dark'>Party Name</th>
                  <th className='thead border border-1 border-dark'>Party Logo</th>
                  <th className='thead border border-1 border-dark'>Short Code</th>
                  <th className='thead border border-1 border-dark'>Action</th>
                </tr>
              </thead>
              <tbody>
                {parties?.map((party, index) => (
                  <tr className='p-2' key={party._id}>
                    <th className='tdata top-pading'>{index + 1}</th>
                    <td className='tdata top-pading'>{party.party_name}</td>
                    <td className='tdata'><img src={party.party_logo} className='partylogo' alt={`${party.party_name} logo`} /></td>
                    <td className='tdata top-pading'>{party.short_code}</td>
                    <td className='tdata'>
                      <button className="smoll-btn delete" onClick={() => handleDeleteParty(party._id)}>Delete</button>
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

      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Create Election Party</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <form encType="multipart/form-data">
              <div className="modal-body">
                <label>Party Name</label>
                <div className="input-group mb-3 mt-2">
                  <input type="text" name="party_name" value={formData.party_name} className={`form-control ${validation.party_name ? 'is-invalid' : ''}`} placeholder="Party Name" onChange={handleChange} />
                  {validation.party_name && <div className="invalid-feedback">{validation.party_name}</div>}
                </div>
                <label>Party Logo</label>
                <div className="input-group mb-3 mt-2">
                  <input type="file" ref={fileInputRef} name="party_logo" accept=".png" className={`form-control ${validation.party_logo ? 'is-invalid' : ''}`} onChange={handleChange} />
                  {validation.party_logo && <div className="invalid-feedback">{validation.party_logo}</div>}
                </div>
                <label>Short Code</label>
                <div className="input-group mb-3 mt-2">
                  <input type="text" name="short_code" value={formData.short_code} className={`form-control ${validation.short_code ? 'is-invalid' : ''}`} placeholder="Short Code" onChange={handleChange} />
                  {validation.short_code && <div className="invalid-feedback">{validation.short_code}</div>}
                </div>
              </div>
            </form>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleAddParty} type="button" className="btn p-color">ADD</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ElectionParties;

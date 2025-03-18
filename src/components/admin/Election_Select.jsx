import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import SideNavbar from './SideNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_ELECTION_PROGRESS, GET_ELECTION_PROGRESS, POST_ELECTION_PROGRESS } from '../../Redux-Saga/Admin_Code/Admin/Election/action/action';
import Swal from 'sweetalert2';

function Election_Select() {
  const [electionData, setElectionData] = useState({
    election_name: '',
    date: '',
  });

  const [validation, setValidation] = useState({
    Eelection_name: '',
    Edate: '',
  });

  const dispatch = useDispatch();
  const api = useSelector((state) => state.ElectionReducer.ElectionData);

  useEffect(() => {
    dispatch({ type: GET_ELECTION_PROGRESS });
  }, []);

  const PostElectionData = () => {
    if (electionData.election_name === '') {
      setValidation((rest) => ({
        ...rest,
        Eelection_name: 'Enter E-Election Name',
      }));
    }
    if (electionData.date === '') {
      setValidation((rest) => ({
        ...rest,
        Edate: 'Enter E-Election Date',
      }));
    } else {
      dispatch({ type: POST_ELECTION_PROGRESS, payload: electionData });
      Swal.fire({
        icon: 'success',
        title: 'Election Added Successfully!',
        html: `<p>Election Name: ${electionData.election_name}</p><p>Election Date: ${electionData.date}</p>`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        closeModal()
        // dispatch({ type: GET_ELECTION_PROGRESS });
        // window.location.reload();
      });
    }
  };

  const inputHandle = (e) => {
    const { name, value } = e.target;

    setElectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'election_name' && value.trim() !== '') {
      setValidation((prevValidation) => ({
        ...prevValidation,
        Eelection_name: '',
      }));
    }

    if (name === 'date') {
      const selectedDate = new Date(value);
      const today = new Date();

      if (selectedDate < today) {
        setValidation((prevValidation) => ({
          ...prevValidation,
          Edate: 'Select a date from today onwards',
        }));
      } else {
        setValidation((prevValidation) => ({
          ...prevValidation,
          Edate: '',
        }));
      }
    }
  };

  const closeModal = () => {
    const modal = document.getElementById('exampleModal');
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
    setValidation({
      Eelection_name: '',
      Edate: '',
    })
    setElectionData({
      election_name: '',
      date: '',
    })
  };

  const electionDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: DELETE_ELECTION_PROGRESS, payload: id });

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The election has been deleted.",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };


  return (
    <>
      <div className=''>
        <div className='row'>
          <Navbar />
          <SideNavbar />
          <div className='col-9'>
            <div className='container-p set-scroll'>
              <table className='table'>
                <tr>
                  <th className='thead border border-1 border-dark' scope='col'>
                    No.
                  </th>
                  <th className='thead border border-1 border-dark' scope='col'>
                    E-Election Name
                  </th>
                  <th className='thead border border-1 border-dark' scope='col'>
                    E-Election Date
                  </th>
                  <th className='thead border border-1 border-dark' scope='col'>
                    Actions
                  </th>
                </tr>
                <tbody>
                  {api?.map((data, index) => (
                    <tr className='p-2' key={index}>
                      <th className='tdata top-pading'>{index + 1}</th>
                      <td className='tdata top-pading'>{data.election_name}</td>
                      <td className='tdata top-pading'>{data.date}</td>
                      <td className='tdata'>
                        <button className="smoll-btn delete" onClick={() => electionDelete(data._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <center>
              <button type='button' data-bs-toggle='modal' data-bs-target='#exampleModal' className='smoll-btn'>
                ADD
              </button>
            </center>

            {/* Modal */}
            <div className='modal fade ' id='exampleModal' tabIndex={-1} aria-labelledby='exampleModalLabel' aria-hidden='true'>
              <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h1 className='modal-title fs-5' id='exampleModalLabel'>
                      Create Election
                    </h1>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
                  </div>
                  <div className='modal-body'>
                    <label>E-Election Name</label>
                    <div className='input-group mt-2 mb-2'>
                      <input
                        type='text'
                        className={`form-control ${validation.Eelection_name ? 'is-invalid' : ''}`}
                        placeholder='E-Election Name'
                        aria-label='Username'
                        aria-describedby='basic-addon1'
                        name='election_name'
                        value={electionData.election_name}
                        onChange={(e) => inputHandle(e)}
                      />
                      {validation.Eelection_name && <div className='invalid-feedback'>{validation.Eelection_name}</div>}
                    </div>
                    <label>E-Election Date</label>
                    <div className='input-group mb-2 mt-2'>
                      <input
                        type='date'
                        className={`form-control ${validation.Edate ? 'is-invalid' : ''}`}
                        placeholder='E-Election Date'
                        aria-label='Username'
                        aria-describedby='basic-addon1'
                        name='date'
                        value={electionData.date}
                        onChange={(e) => inputHandle(e)}
                      />
                      {validation.Edate && <div className='invalid-feedback'>{validation.Edate}</div>}
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                      Close
                    </button>
                    <button onClick={PostElectionData} type='button' className='btn p-color'>
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Election_Select;

import React, { useEffect, useState } from "react";
import SideNavbar from "./SideNavbar";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_PARTYCONNECT_PROGRESS,
  GET_PARTYCONNECT_PROGRESS,
  POST_PARTYCONNECT_PROGRESS,
} from "../../Redux-saga/Admin_Code/Admin/PartyConnect/action/action";
import { GET_ELECTION_PROGRESS } from "../../Redux-Saga/Admin_Code/Admin/Election/action/action";
import { GET_PARTY_PROGRESS } from "../../Redux-Saga/Admin_Code/Admin/Partys/action/action";
import Swal from "sweetalert2";

function Election_Conect() {
  const [edata, setEdata] = useState({ election: "", party: "" });
  const [validation, setValidation] = useState({ Eelection: "", Eparty: "" });

  const dispatch = useDispatch();
  const api = useSelector((state) => state.PartyConnectReducer.PartyConnectData);
  const electionData = useSelector((state) => state.ElectionReducer.ElectionData);
  const party = useSelector((state) => state.PartyReducer.PartyData);

  useEffect(() => {
    dispatch({ type: GET_PARTYCONNECT_PROGRESS });
    dispatch({ type: GET_ELECTION_PROGRESS });
    dispatch({ type: GET_PARTY_PROGRESS });
  }, [dispatch]);

  const inputHandel = (e) => {
    const { name, value } = e.target;
    setEdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleConectParty = () => {
    let isValid = true;
    let errors = { Eelection: "", Eparty: "" };

    if (!edata.election) {
      errors.Eelection = "Select an Election";
      isValid = false;
    }
    if (!edata.party) {
      errors.Eparty = "Select a Party";
      isValid = false;
    }

    setValidation(errors);

    if (isValid) {
      dispatch({ type: POST_PARTYCONNECT_PROGRESS, payload: edata });
      setEdata({ election: "", party: "" });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Party connected successfully.",
      });

      dispatch({ type: GET_PARTYCONNECT_PROGRESS });
    } else {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix the errors before proceeding.",
      });
    }
  };

  const partyDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Show loading alert
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while the party is being deleted.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Simulate delay with setTimeout before API call
        setTimeout(() => {
          dispatch({ type: DELETE_PARTYCONNECT_PROGRESS, id });

          // Show success alert
          Swal.fire({
            title: "Deleted!",
            text: "The party has been removed.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          // Refresh party list after a short delay
          setTimeout(() => {
            dispatch({ type: GET_PARTYCONNECT_PROGRESS });
          }, 500); // Adjust delay as needed
        }, 1000); // Simulated API delay
      }
    });
  };


  return (
    <div className="">
      <div className="row">
        <Navbar />
        <SideNavbar />
        <div className="col-6">
          <div className="container-p set-scroll">
            <center className="connnect">
              <table style={{ transform: "scale(0.9)" }} className="table">
                <thead>
                  <tr>
                    <th className="thead border border-1 border-dark">No.</th>
                    <th className="thead border border-1 border-dark">E-Election</th>
                    <th className="thead border border-1 border-dark">E-Election Party</th>
                    <th className="thead border border-1 border-dark">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {api?.map((item, index) => (
                    <tr className="p-2" key={index}>
                      <th className="tdata">{index + 1}</th>
                      <td className="tdata">{item.election?.election_name}</td>
                      <td className="tdata">{item.party?.party_name}</td>
                      <td className="tdata">
                        <button className="smoll-btn delete" onClick={() => partyDelete(item._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </center>
          </div>
        </div>

        {/* Form Section */}
        <div className="col-3">
          <div className="lshadow">
            <div className="partyadd">
              <label className="form-label">E-Election Party Short Code</label>
              <select
                onChange={inputHandel}
                name="election"
                className="form-select form-select-lg mb-2"
                value={edata.election}
              >
                <option value="">Open this select menu</option>
                {electionData?.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.election_name}
                  </option>
                ))}
              </select>
              {validation.Eelection && <p className="error-text mb-4">{validation.Eelection}</p>}

              <label className="form-label">E-Election Party Short Code</label>
              <select
                onChange={inputHandel}
                name="party"
                className="form-select form-select-lg mb-2"
                value={edata.party}
              >
                <option value="">Open this select menu</option>
                {party?.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.party_name}
                  </option>
                ))}
              </select>
              {validation.Eparty && <p className="error-text mb-4">{validation.Eparty}</p>}
            </div>

            <div className="last-btn">
              <button type="button" onClick={handleConectParty} className="smoll-btn">
                Connect Party
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Election_Conect;

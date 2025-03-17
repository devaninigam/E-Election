import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import SideNavbar from './SideNavbar'
import axios from 'axios'
import { BASE_URL, GET_USER_LIST } from '../../Redux-saga/constant'
import { useDispatch, useSelector } from 'react-redux'
import { GET_PARTY_PROGRESS } from '../../Redux-Saga/Admin_Code/Admin/Partys/action/action'
import { GET_TOTALCOUNT_PROGRESS } from '../../Redux-saga/Admin_Code/Admin/TotalCount/action/action'

function Election_Vote() {
  const [ulength, setUlength] = useState({
    user: 0,
    // eparty : 0
  })
  const dispatch = useDispatch()
  const partylist = useSelector(state => state.PartyReducer.PartyData)
  const TotalCount = useSelector(state => state.TotalCountReducer.PartyConnectData)

  useEffect(() => {
    dispatch({ type: GET_PARTY_PROGRESS })
    dispatch({ type: GET_TOTALCOUNT_PROGRESS })
    const GetUser = async () => {
      try {
        const userResponse = await axios.get(BASE_URL + GET_USER_LIST);
        const userlength = userResponse.data.data;

        setUlength((prev) => ({
          ...prev,
          eparty: partylist.length,
          user: userlength.length,
        }));
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };
    GetUser()
  }, [])
  return (
    <>
      <div className=''>
        <div className='row'>
          <Navbar />
          <SideNavbar />
          <div className='col-8'>
            <div className="container-p">
              <div className=" d-flex ">
                <div className="col-6 box-sh shadow-sm">
                  <h4 className='vote-text-set'>Total votiing users</h4>
                  <h2 className='vote-count-set'>{ulength.user}</h2>
                </div>
                <div className="col-6 box-sh shadow-sm">
                  <h4 className='vote-text-set'>the party in E-election</h4>
                  <h2 className='vote-count-set'>{partylist ? partylist.length : 0}</h2>
                </div>
              </div>
              <center>
                <div className="calling">
                  <table style={{ transform: "scale(0.9)" }} className="table ">
                    <tr>
                      <th className='thead border border-1 border-dark' scope="col">No.</th>
                      <th className='thead border border-1 border-dark' scope="col">E-Election Party Name</th>
                      <th className='thead border border-1 border-dark' scope="col">E-Election Party Vote</th>
                    </tr>
                    <tbody>
                      {Object.keys(TotalCount).map((party, index) => (
                        <tr className='p-2' key={index}>
                          <th className='tdata'>{index + 1}</th>
                          <td className='tdata'>{party}</td>
                          <td className='tdata'>{TotalCount[party]}</td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Election_Vote
import React, { useEffect, useState } from 'react'
import "./User-tool/User.css"
import "./User-tool/userResponsive.css"
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { GET_PARTYCONNECT_PROGRESS } from '../../Redux-saga/Admin_Code/Admin/PartyConnect/action/action'
import { VOTE_POST_PROGRESS } from '../../Redux-saga/User_code/voting/action'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
import { BASE_URL, GET_VOTE } from '../../Redux-saga/constant'

const Voting = () => {
    const [vote, setVote] = useState()
    const [ChakeVote, setChakeVote] = useState(false)

    const userId = Cookies.get("_id")
    const CARDNUMBER = Cookies.get("cardNo")


    const GetVoteList = async () => {
        const userData = []
        const res = await axios.get(BASE_URL + GET_VOTE)
        const userinfo = (res.data.data)
        userinfo.map(i =>
            userData.push(i.user.cardNo)
        )
        if (userData.includes(CARDNUMBER)) {
            setChakeVote(true)
        } else {
            setChakeVote(false)
        }
        console.log(userData);

    }

    const MySwal = withReactContent(Swal);

    const dispatch = useDispatch()

    const { PartyConnectData } = useSelector(state => state.PartyConnectReducer)

    useEffect(() => {
        dispatch({ type: GET_PARTYCONNECT_PROGRESS });
        GetVoteList()
    }, []);

    const fetchData = (index) => {
        let data = {
            user: userId,
            party: PartyConnectData[index].party._id,
            election: PartyConnectData[index].election._id
        }
        setVote({ ...vote, ...data })
    }

    const submitVote = () => {

        if (vote == null) {
            MySwal.fire({
                title: 'Please Select a Particular Party !',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonText: 'Sure',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location = "/";
                }
            });
        } else {
            MySwal.fire({
                title: 'Your Vote Is Successfully Submitted !',
                text: 'You have submitted a vote ?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Thank You For Voting',
                cancelButtonText: 'No, cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch({ type: VOTE_POST_PROGRESS, payload: vote })
                    handleConformClick()
                }
            });
        }
    }

    const handleConformClick = () => {
        Cookies.remove("role");
        Cookies.remove("name");
        Cookies.remove("_id");
        Cookies.remove("cardNo");
        window.location = "/";
    }

    return (
        <>
            <Navbar />
            {
                ChakeVote ? (
                    <>
                        {
                            MySwal.fire({
                                title: 'You have already submitted a vote',
                                text: 'Thank you for visiting!',
                                icon: 'info',
                                confirmButtonText: 'Confirm',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handleConformClick();
                                }
                            })
                        }
                    </>
                ) : (
                    <>
                        <div className='vt'>
                            <table className="table table-bordered text-center w-50 mb-0">
                                <thead>
                                    <tr className='border-black'>
                                        <th>No.</th>
                                        <th>Indian Political Party</th>
                                        <th>Symbols</th>
                                        <th>Button </th>
                                    </tr>
                                </thead>
                                <tbody className='table-bordered'>
                                    {PartyConnectData.map((v, i) =>
                                        <tr key={i}>
                                            <td className='pd'>{i + 1}</td>
                                            <td className='pd'>{v.party?.party_name}</td>
                                            <td className='w-25'>
                                                <div className='party-logo'>
                                                    <img src={'img'} alt={v.party?.party_name} className='w-50' />
                                                </div>
                                            </td>
                                            <td className='pd'>
                                                <input type='radio' name='party' onChange={() => fetchData(i)} />
                                            </td>
                                        </tr>
                                    )}
                                </tbody >
                            </table>
                            <button onClick={submitVote}>Submit</button>
                        </div>
                    </>
                )
            }

        </>
    )
}

export default Voting
import { takeLatest } from "redux-saga/effects";
import { DELETE_ELECTION_PROGRESS, GET_ELECTION_PROGRESS, POST_ELECTION_PROGRESS } from "../../Admin/Election/action/action";
import { DeleteElectionManage, GetElectionManage, PostElectionManage } from "../ElectionManage/ElectionManage";
import { DeletePartyManage, GetPartyManage, PostPartyManage } from "../PartyManage/PartyMange";
import { DELETE_PARTY_PROGRESS, GET_PARTY_PROGRESS, POST_PARTY_PROGRESS } from "../../Admin/Partys/action/action";
import { DeletePartyConnectManage, GetPartyConnectManage, PostPartyConnectManage } from "../PartyConnectManage/PartyConnectManage";
import { DELETE_PARTYCONNECT_PROGRESS, GET_PARTYCONNECT_PROGRESS, POST_PARTYCONNECT_PROGRESS } from "../../Admin/PartyConnect/action/action";
import { GET_TOTALCOUNT_PROGRESS } from "../../Admin/TotalCount/action/action";
import { GetTotalCountManage } from "../TotalCountManage/TotalCountManage";

//GET ELECTION FUN IN ROOTSAGA
export function* GetElectionRootSaga() {
  yield takeLatest(GET_ELECTION_PROGRESS, GetElectionManage)
}
//POST ELECTION FUN IN ROOTSAGA
export function* PostElectionRootSaga() {
  yield takeLatest(POST_ELECTION_PROGRESS, PostElectionManage)
}
//DELETE ELECTION FUN IN ROOTSAGA
export function* DeleteElectionRootSaga() {
  yield takeLatest(DELETE_ELECTION_PROGRESS, DeleteElectionManage)
}
//GET PARTY FUN IN ROOTSAGA
export function* GetPartyRootSaga() {
  yield takeLatest(GET_PARTY_PROGRESS, GetPartyManage)
}
//POST PARTY FUN IN ROOTSAGA
export function* PostPartyRootSaga() {
  yield takeLatest(POST_PARTY_PROGRESS, PostPartyManage)
}
//DELETE PARTY FUN IN ROOTSAGA
export function* DeletePartyRootSaga() {
  yield takeLatest(DELETE_PARTY_PROGRESS, DeletePartyManage)
}
//GET PARTYCONNECT FUN IN ROOTSAGA
export function* GetPartyConnectRootSaga() {
  yield takeLatest(GET_PARTYCONNECT_PROGRESS, GetPartyConnectManage)
}
//POST PARTYCONNECT FUN IN ROOTSAGA
export function* PostPartyConnectRootSaga() {
  yield takeLatest(POST_PARTYCONNECT_PROGRESS, PostPartyConnectManage)
}
//POST PARTYCONNECT FUN IN ROOTSAGA
export function* DeletePartyConnectDeleteRootSaga() {
  yield takeLatest(DELETE_PARTYCONNECT_PROGRESS, DeletePartyConnectManage)
}
//GET TOTAL COUNT FUN IN ROOTSAGA
export function* GetTotalCountRootSaga() {
  yield takeLatest(GET_TOTALCOUNT_PROGRESS, GetTotalCountManage)
}
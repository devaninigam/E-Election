import { all } from "redux-saga/effects";
import {
  DeleteElectionRootSaga,
  DeletePartyConnectDeleteRootSaga,
  DeletePartyRootSaga,
  GetElectionRootSaga,
  GetPartyConnectRootSaga,
  GetPartyRootSaga,
  GetTotalCountRootSaga,
  PostElectionRootSaga,
  PostPartyConnectRootSaga,
  PostPartyRootSaga
} from "./Root/RootSaga";

export function* SagaIndex() {
  // all RootSaga Function Call in one Line ,
  yield all([
    //ELECTION ROOTSAGA IN SAGAINDEX
    GetElectionRootSaga(),
    PostElectionRootSaga(),
    DeleteElectionRootSaga(),
    // PARTY ROOTSAGA IN SAGAINDEX
    GetPartyRootSaga(),
    PostPartyRootSaga(),
    DeletePartyRootSaga(),
    // PARTYCONNECT ROOTSAGA IN SAGAINDEX 
    GetPartyConnectRootSaga(),
    PostPartyConnectRootSaga(),
    DeletePartyConnectDeleteRootSaga(),
    //TOTAL COUNT ROOTSAGA IN SAGAINDEX
    GetTotalCountRootSaga(),
  ])
}
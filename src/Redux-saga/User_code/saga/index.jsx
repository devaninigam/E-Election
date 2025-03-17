import { all } from "redux-saga/effects";
import { postVoteSaga } from "./root/manageVoteRoot";

export function* voteSaga() {
    yield all([
        postVoteSaga()
    ])
}
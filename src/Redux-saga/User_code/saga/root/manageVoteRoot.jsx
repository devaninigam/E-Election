import { takeEvery } from "redux-saga/effects";
import { VOTE_POST_PROGRESS } from "../../voting/action";
import { managePostVote } from "../manageVote/manageVote";

// POST SAGA
export function* postVoteSaga() {
    yield takeEvery(VOTE_POST_PROGRESS, managePostVote)
}
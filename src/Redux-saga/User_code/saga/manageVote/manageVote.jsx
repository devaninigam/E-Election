import { VOTE_POST_ERROR, VOTE_POST_SUCCESS } from "../../voting/action";
import { postVoteApi } from "../../voting/api";
import { call, put } from 'redux-saga/effects'

//POST VOTE MANAGE
export function* managePostVote(action) {
    try {
        const res = yield call(postVoteApi, action)
        const data = res.data
        const status = res.status

        if (status == 200 || 201) yield put({ type: VOTE_POST_SUCCESS, data })
        else yield put({ type: VOTE_POST_ERROR, data })

    } catch (err) {
        yield put({ type: VOTE_POST_ERROR, err })
    }
}
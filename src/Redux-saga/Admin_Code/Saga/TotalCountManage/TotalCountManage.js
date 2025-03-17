import { call, put } from "redux-saga/effects"
import { GetTotalCountAxios } from "../../Admin/TotalCount/api/api";
import { GET_TOTALCOUNT_ERROR, GET_TOTALCOUNT_SUCCESS } from "../../Admin/TotalCount/action/action";

// GET P MANAGE 
export function* GetTotalCountManage(action) {
  try {
    const res = yield call(GetTotalCountAxios, action)
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: GET_TOTALCOUNT_SUCCESS, data })
    } else {
      yield put({ type: GET_TOTALCOUNT_ERROR, data })
    }
  } catch (error) {
    yield put({ type: GET_TOTALCOUNT_ERROR, error })
  }
}
import { VOTE_POST_ERROR, VOTE_POST_PROGRESS, VOTE_POST_SUCCESS } from "./action"

const InitialState = {
    vote: [],

    isProgress: false,
    isLoaded: false,
    isError: null
}

const voteReducer = (state = InitialState, action) => { 
    switch (action.type) {
        case VOTE_POST_PROGRESS:
            return {
                ...state,
                isProgress: true
            }
        case VOTE_POST_SUCCESS:
            return {
                ...state,
                vote: state.vote.concat(action.data),
                isProgress: false
            }
        case VOTE_POST_ERROR:
            return {
                ...state,
                isError: action.data
            }

        default: return state
    }
}

export default voteReducer
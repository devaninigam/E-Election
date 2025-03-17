import {
  GET_PARTY_ERROR,
  GET_PARTY_PROGRESS,
  GET_PARTY_SUCCESS,
  POST_PARTY_ERROR,
  POST_PARTY_PROGRESS,
  POST_PARTY_SUCCESS
} from "../action/action";

const initialState = {
  // PARTY MAIN STATE  
  PartyData: [],

  // PARTY GET DATA ACTION --- GET 
  GetPartyProgress: false,
  GetPartyError: null,

  // PARTY POST DATA ACTION --- POST
  PostPartyProgress: false,
  PostPartyError: null,

  DataIsLoaded: false
};

function PartyReducer(state = initialState, action) {
  switch (action.type) {

    // PARTY GET DATA ACTION --- GET

    case GET_PARTY_PROGRESS:
      return {
        ...state,
        GetPartyProgress: true,
      };
    case GET_PARTY_ERROR:
      return {
        ...state,
        GetPartyError: action.data,
      };
    case GET_PARTY_SUCCESS:
      return {
        ...state,
        DataIsLoaded: true,
        PartyData: action.data,
        GetPartyProgress: false,
      };

    // PARTY POST DATA ACTION --- POST

    case POST_PARTY_PROGRESS:
      return {
        ...state,
        PostPartyProgress: true,
      };
    case POST_PARTY_ERROR:
      return {
        ...state,
        PostPartyError: action.data,
      };
    case POST_PARTY_SUCCESS:
      return {
        ...state,
        DataIsLoaded: true,
        PartyData: state.PartyData.concat(action.payload),
        PostPartyProgress: false,
      };

    // SET DEFAULT
    default:
      return state;
  }
}

export default PartyReducer;

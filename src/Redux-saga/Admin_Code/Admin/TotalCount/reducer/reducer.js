import { GET_TOTALCOUNT_ERROR, GET_TOTALCOUNT_PROGRESS, GET_TOTALCOUNT_SUCCESS } from "../action/action";

const initialState = {
  // PARTYCONNECT MAIN STATE  
  PartyConnectData: [],

  // PARTYCONNECT GET DATA ACTION --- GET 
  GetTotalCountProgress: false,
  GetTotalCountError: null,

  DataIsLoaded: false
};

function TotalCountReducer(state = initialState, action) {
  switch (action.type) {

    // PARTYCONNECT GET DATA ACTION --- GET

    case GET_TOTALCOUNT_PROGRESS:
      return {
        ...state,
        GetTotalCountProgress: true,
      };
    case GET_TOTALCOUNT_ERROR:
      return {
        ...state,
        GetTotalCountError: action.data,
      };
    case GET_TOTALCOUNT_SUCCESS:
      return {
        ...state,
        DataIsLoaded: true,
        PartyConnectData: action.data,
        GetTotalCountProgress: false,
      };


    // SET DEFAULT
    default:
      return state;
  }
}

export default TotalCountReducer;

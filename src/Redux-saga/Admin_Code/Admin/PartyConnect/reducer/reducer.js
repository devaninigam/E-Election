import { GET_PARTYCONNECT_ERROR, GET_PARTYCONNECT_PROGRESS, GET_PARTYCONNECT_SUCCESS, POST_PARTYCONNECT_ERROR, POST_PARTYCONNECT_PROGRESS, POST_PARTYCONNECT_SUCCESS } from "../action/action";

const initialState = {
  // PARTYCONNECT MAIN STATE  
  PartyConnectData: [],

  // PARTYCONNECT GET DATA ACTION --- GET 
  GetPartyConnectProgress: false,
  GetPartyConnectError: null,

  // PARTYCONNECT POST DATA ACTION --- POST
  PostPartyConnectProgress: false,
  PostPartyConnectError: null,

  DataIsLoaded: false
};

function PartyConnectReducer(state = initialState, action) { 
  switch (action.type) {

    // PARTYCONNECT GET DATA ACTION --- GET

    case GET_PARTYCONNECT_PROGRESS:
      return {
        ...state,
        GetPartyConnectProgress: true,
      };
    case GET_PARTYCONNECT_ERROR:
      return {
        ...state,
        GetPartyConnectError: action.data,
      };
    case GET_PARTYCONNECT_SUCCESS:
      return {
        ...state,
        DataIsLoaded: true,
        PartyConnectData: action.data,
        GetPartyConnectProgress: false,
      };

    // PARTYCONNECT POST DATA ACTION --- POST

    // case POST_PARTYCONNECT_PROGRESS:
    //   return {
    //     ...state,
    //     PostPartyConnectProgress: true,
    //   };
    // case POST_PARTYCONNECT_ERROR:
    //   return {
    //     ...state,
    //     PostPartyConnectError: action.data,
    //   }; 
    // case POST_PARTYCONNECT_SUCCESS:
    //   return {
    //     ...state,
    //     DataIsLoaded: true,
    //     PartyConnectData: state.PartyConnectData.concat(action.payload),
    //     PostPartyConnectProgress: false,
    //   };

    // SET DEFAULT
    default:
      return state;
  }
}

export default PartyConnectReducer;
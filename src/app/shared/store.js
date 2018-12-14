import { createStore } from 'redux';

const reducer = (state, action) =>{
  if ( action.type === "ADD_TO_USER") {
    return {
      ...state,
      userData: state.userData.concat( action.userState )
    }
  }

  if ( action.type === "ADD_IS_USER_LOGGED") {
    return {
      ...state,
      isUserLogged: action.isUserLogged
    }
  }

  return state;
}

export default createStore(reducer, { userData: [], isUserLogged: false});

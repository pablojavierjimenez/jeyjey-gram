import { createStore } from 'redux';

const reducer = (state, action) =>{
  if ( action.type === "ADD_TO_USER") {
    return {
      ...state,
      userData: state.userData.concat( action.userState )
    }
  }
  return state;
}

export default createStore(reducer, { userData: [] });

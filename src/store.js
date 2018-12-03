import { createStore } from 'redux';

const reducer = (state, action) =>{
  if ( action.type === "ADD_TO_LIKE") {
    return {
      ...state,
      like: state.like.concat( action.product )
    }
  }
  return state;
}

export default createStore(reducer, { like: [] });

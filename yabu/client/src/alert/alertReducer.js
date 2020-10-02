import {SET_ALERT,REMOVE_ALERT} from '../contact/types'
export default (state, action) => {

  switch(action.type){
    
    case SET_ALERT:
      // console.log(Object.values(action)[1])
      
      return [...state, Object.values(action)[1]];
    case REMOVE_ALERT:
      return state.filter(alert=> alert.id !== action.payload );
    default:
      return state;

  }


}


import * as ActionTypes from '../../constants/ActionTypes';

export default function wastedTime(state = {wastes: []}, action) {
  switch (action.type) {
  case ActionTypes.ADD_WASTED_TIME:
    return {
      ...state,
      wastes: [...state.wastes, action.data]
    };
  default:
    return state;
  }
}

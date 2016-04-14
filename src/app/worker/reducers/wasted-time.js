import * as ActionTypes from '../../constants/ActionTypes';

export default function wastedTime(state = {wastes: []}, action) {
  switch (action.type) {
  case ActionTypes.ADD_WASTED_TIME:
    return {
      ...state,
      wastes: [...state.wastes, action.data]
    };
  case ActionTypes.ADD_COUNTER_TIME:
    const newWaste = {...action.data, time: 12};
    return {
      ...state,
      wastes: [newWaste, ...state.wastes]
    };
  case ActionTypes.DELETE_WASTE:
    return {
      ...state,
      wastes: state.wastes.filter(w=> w.id !== action.data)
    };
  default:
    return state;
  }
}
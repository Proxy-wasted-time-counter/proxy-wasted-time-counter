import * as ActionTypes from '../../constants/ActionTypes';

export default function counter(state = {value: 0, active: false}, action) {
  switch (action.type) {
  case ActionTypes.INCR_COUNT:
    return {
      ...state,
      value: action.data.value,
      active: action.data.active
    };
  case ActionTypes.RESET_COUNTER:
    return {
      ...state,
      value: 0,
      active: false
    };
  default:
    return state;
  }
}

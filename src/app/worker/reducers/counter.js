import * as ActionTypes from '../../constants/ActionTypes';

export default function counter(state = {value: 0}, action) {
  switch (action.type) {
  case ActionTypes.INCR_COUNT:
    return {
      ...state,
      value: state.value + 1
    };
  default:
    return state;
  }
}

import * as ActionTypes from '../../constants/ActionTypes';

export default function mode(state = {open: false}, action) {
  switch (action.type) {
  case ActionTypes.TOGGLE_MENU:
    return {
      ...state,
      open: !state.open
    };
  default:
    return state;
  }
}

import * as ActionTypes from '../constants/ActionTypes';

export function toogleMenuAction() {
  return dispatch => {
    dispatch({
      type: ActionTypes.TOGGLE_MENU
    });
  };
};
export function addWastedTime(time) {
  return dispatch => {
    dispatch({
      type: ActionTypes.ADD_WASTED_TIME,
      waste: {
        date: new Date(),
        time: time
      }
    });
  };
};

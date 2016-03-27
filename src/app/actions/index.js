import * as ActionTypes from '../constants/ActionTypes';

export function addWastedTime(time) {
  return (dispatch, store) => {
    dispatch({
      type: ActionTypes.ADD_WASTED_TIME,
      waste: {
        date: new Date(),
        time: time
      }
    });
  };
};

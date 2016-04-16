import { v1 as uuid} from 'node-uuid';
import { Router } from 'multithread-it';

import * as ActionTypes from '../../constants/ActionTypes';

function changeRoute(route) {
  return {
    type: Router.CHANGE_ROUTE,
    data: route
  };
}

function addWastedTime({time, unit}) {
  return {
    type: ActionTypes.ADD_WASTED_TIME,
    data: {
      id: uuid(),
      time: time,
      unit: unit,
      date: new Date().getTime()
    }
  };
}

function deleteWaste(idToDelete) {
  return {
    type: ActionTypes.DELETE_WASTE,
    data: idToDelete
  };
}

function incrCount() {
  return (dispatch, getState) => {
    const counterTime = getState().counter.value;
    dispatch({
      type: ActionTypes.INCR_COUNT,
      data: {
        value: counterTime + 1,
        active: true
      }
    });
  };
}

function addCounterTime() {
  return (dispatch, getState) => {
    const counterTime = getState().counter.value;
    dispatch({
      type: ActionTypes.ADD_WASTED_TIME,
      data: {
        id: uuid(),
        time: counterTime,
        unit: 'second',
        date: new Date().getTime()
      }
    });
    dispatch({
      type: ActionTypes.RESET_COUNTER
    });
  };
}

export default {
  [Router.CHANGE_ROUTE]: changeRoute,
  [ActionTypes.ADD_WASTED_TIME]: addWastedTime,
  [ActionTypes.DELETE_WASTE]: deleteWaste,
  [ActionTypes.INCR_COUNT]: incrCount,
  [ActionTypes.ADD_COUNTER_TIME]: addCounterTime
};

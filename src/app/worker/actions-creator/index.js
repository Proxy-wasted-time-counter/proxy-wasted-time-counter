import { v1 as uuid} from 'node-uuid';
import { Router } from 'multithread-it';
import moment from 'moment';

import * as ActionTypes from '../../constants/ActionTypes';

function changeRoute(route) {
  return {
    type: Router.CHANGE_ROUTE,
    data: route
  };
}

function addWastedTime({time, unit}) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.ADD_WASTED_TIME,
      data: {
        id: uuid(),
        time: time,
        unit: unit,
        date: new Date().getTime()
      }
    });
    dispatch(aggregateMonthWastes());
  };
}

function deleteWaste(idToDelete) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.DELETE_WASTE,
      data: idToDelete
    });
    dispatch(aggregateMonthWastes());
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
        unit: 'seconds',
        date: new Date().getTime()
      }
    });
    dispatch({
      type: ActionTypes.RESET_COUNTER
    });
    dispatch(aggregateMonthWastes());
  };
}

function aggregateMonthWastes() {
  return (dispatch, getState) => {
    const wastes = getState().wastedTime.wastes;
    const currentMonth = moment().startOf('month');

    const sum = wastes.filter(w => {
      return moment(wastes.date).isSameOrAfter(currentMonth);
    })
    .reduce((current, waste) => {
      const seconds = moment.duration(parseInt(waste.time, 10), waste.unit).as('seconds');
      return current + seconds;
    }, 0);

    const humanizedTotal = moment.duration(sum, 'seconds').humanize();
    const capitalizedHumanizedTotal = humanizedTotal.charAt(0).toUpperCase() + humanizedTotal.slice(1);

    dispatch({
      type: ActionTypes.SET_MONTH_AGGREGATE,
      data: {
        month: currentMonth.format('MM/YYYY'),
        total: sum,
        humanizedTotal: capitalizedHumanizedTotal
      }
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

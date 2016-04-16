import { Router } from 'multithread-it';

export default function route(state = {current: 'home'}, action) {
  switch (action.type) {
    case Router.CHANGE_ROUTE:
      return {
        ...state,
        current: action.data
      };
    default:
      return state;
  }
}

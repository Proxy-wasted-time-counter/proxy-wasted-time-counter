import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';
import { v1 as uuid} from 'node-uuid';

import * as ActionTypes from '../../constants/ActionTypes';

const COMP_ID = 'COUNTER';

const START_ACTION = 'start';
const STOP_ACTION = 'stop';

export class Component extends MultithreadItComponent {

  render(active, value) {
    const button = active ?
      <button data-click={COMP_ID} counter-action={STOP_ACTION} className="button is-danger is-outlined">Stop</button> :
      <button data-click={COMP_ID} counter-action={START_ACTION} className="button is-success is-outlined">Start</button>;
    return (
      <div className="container has-text-centered">
        <h3 className="title">Counter</h3>
        <div className="counter-value">{value}</div>
        {button}
      </div>
    );
  }
}

export class EventsHandlers extends MultithreadItEventsHandler {
  constructor(workerStore) {
    super(workerStore);

    this.addEventHandlers(
      'click',
      e => this._startStop(e)
    );
  }

  _startStop(e) {
    const target = e.target;
    if (target['data-click'] === COMP_ID) {
      e.preventDefault();
      const action = target['counter-action'];
      if (action === START_ACTION) {
        this._start();
      }
      if (action === STOP_ACTION) {
        this._stop();
      }
    }
  }

  _start() {
    this._interval = setInterval(() => {
      this._worker.dispatchEvent(
        ActionTypes.INCR_COUNT
      );
    }, 1000);
  }

  _stop() {
    clearTimeout(this._interval);
    this._worker.dispatchEvent(
      ActionTypes.ADD_COUNTER_TIME,
      {id: uuid(), unit: 'second', date: new Date().getTime()}
    );
  }
}

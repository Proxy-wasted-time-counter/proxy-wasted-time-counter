import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';

import * as ActionTypes from '../../constants/ActionTypes';

const COMP_ID = 'WASTED_TIME_ADDER';

export class Component extends MultithreadItComponent {

  render() {
    return (
      <form name="addWastedTime" data-submit={COMP_ID} >
        <h3 className="title">Add wasted time</h3>
        <p className="control">
          <label className="radio">
            <input type="radio" name="timeUnit" checked defaultValue="second" />
            Seconds
          </label>
          <label className="radio">
            <input type="radio" name="timeUnit" defaultValue="minute" />
            Minutes
          </label>
          <label className="radio">
            <input type="radio" name="timeUnit" defaultValue="hour" />
            Hours
          </label>
          <label className="radio">
            <input type="radio" name="timeUnit" defaultValue="day" />
            Days :O
          </label>
        </p>
        <p className="control is-grouped">
          <input name="time" type="number" className="input" placeholder="How much time you waste?" />
          <button type="submit" name="add" className="button is-primary">Save</button>
        </p>
      </form>
    );
  }
}

export class EventsHandlers extends MultithreadItEventsHandler {
  constructor(workerStore) {
    super(workerStore);

    this.addEventHandlers(
      'submit',
      e => this._onSubmit(e)
    );
  }

  _onSubmit(e) {
    const target = e.target;
    if (target['data-submit'] === COMP_ID) {
      e.preventDefault();
      const timeToAdd = target.time.value;
      const timeUnit = target.timeUnit.value;
      target.time.value = '';
      this._worker.dispatchEvent(
        ActionTypes.ADD_WASTED_TIME,
        {time: timeToAdd, unit: timeUnit, date: new Date().getTime()}
      );
    }
  }
}

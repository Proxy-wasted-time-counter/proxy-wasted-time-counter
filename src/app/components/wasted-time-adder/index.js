import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';

import * as ActionTypes from '../../constants/ActionTypes';

const COMP_ID = 'WASTED_TIME_ADDER';

export class Component extends MultithreadItComponent {

  render() {
    return (
      <form name="addWastedTime" data-submit={COMP_ID} className="mui-form--inline">
        <legend>Add wasted time</legend>
        <div className="mui-textfield mui-textfield--float-label">
          <input name="time" type="number" />
          <label>How much time you waste?</label>
        </div>
        <button type="submit" name="add" className="mui-btn">Save</button>
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
      target.time.value = '';
      this._worker.dispatchEvent(ActionTypes.ADD_WASTED_TIME, {time: timeToAdd, date: new Date()});
    }
  }
}

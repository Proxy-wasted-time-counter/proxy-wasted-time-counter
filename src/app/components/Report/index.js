import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';

import HistoryComponent from './History';
import CurrentComponent from './Current';

export class Component extends MultithreadItComponent {
  constructor() {
    super();

    this._current = new CurrentComponent();
    this._history = new HistoryComponent();
  }

  onInit() {

    this.watch(
      state => state.wastedTime.perMonth,
      wastesPerMonth => this._wastesPerMonth = wastesPerMonth
    );
  }

  render() {
    return (
    <div>
      <div className="column container">
        <div className="box">
          <p>
            {this._current.render(this._wastesPerMonth)}
          </p>
        </div>
      </div>
      <div className="column container">
        <div className="box">
          <p>
            {this._history.render(this._wastesPerMonth)}
          </p>
        </div>
      </div>
    </div>
    );
  }
}

export class EventsHandler extends MultithreadItEventsHandler {
  constructor(workerStore) {
    super(workerStore);
  }

  register(eventsMap) {
  }
}

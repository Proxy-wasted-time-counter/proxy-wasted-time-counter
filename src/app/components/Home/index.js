import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';

import { persistWastes } from '../../worker/storage';

import * as WastedTimeAdder from './wasted-time-adder';
import * as WastesList from './wastes-list';
import * as Counter from './counter';

export class Component extends MultithreadItComponent {
  _wastes = [];

  constructor() {
    super();

    this._counter = new Counter.Component();
    this._wastedTimeAdder = new WastedTimeAdder.Component();
    this._wastesList = new WastesList.Component();

  }

  onInit() {
    this.watch(
      state => state.wastedTime.wastes,
      wastes => this._wastes = wastes
    );
    this.watch(
      state => state.wastedTime,
      wastedTime => persistWastes(wastedTime)
    );
    this.watch(
      state => state.counter,
      counter => {
        this._counterValue = counter.value;
        this._counterActive = counter.active;
      }
    );
  }

  render() {
    return (
      <div className="column container">
        <div className="box">
          <p>
            {this._counter.render(this._counterActive, this._counterValue)}
          </p>
        </div>
        <div className="box">
          <p>
            {this._wastedTimeAdder.render()}
          </p>
        </div>
        <div className="box">
          <p>
            {this._wastesList.render(this._wastes)}
          </p>
        </div>
      </div>
    );
  }
}

export class EventsHandler extends MultithreadItEventsHandler {
  constructor(workerStore) {
    super(workerStore);

    this._wastesAdderEvents = new WastedTimeAdder.EventsHandlers(this._worker);
    this._wastesListEvents = new WastesList.EventsHandlers(this._worker);
    this._counterEvents = new Counter.EventsHandlers(this._worker);
  }

  register(eventsMap) {
    this._counterEvents.register(eventsMap);
    this._wastesAdderEvents.register(eventsMap);
    this._wastesListEvents.register(eventsMap);
  }
}

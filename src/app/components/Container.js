import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';

import { persistWastes } from '../worker/storage';

import Header from './header';
import * as WastedTimeAdder from './wasted-time-adder';
import * as WastesList from './wastes-list';
import * as Counter from './counter';

export class Container extends MultithreadItComponent {
  _wastes = [];

  constructor(menuLinks) {
    super();

    this._header = new Header();
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
      state => state.wastedTime.wastes,
      wastes => persistWastes(wastes)
    );
    this.watch(
      state => state.counter.value,
      counterValue => this._counterValue = counterValue
    );
  }

  render() {
    return (
      <app>
        {this._header.render()}
        <div className="box">
          <div className="hero">
            <div className="hero-content">
              <div className="container">
                <h1 className="title">PWTC</h1>
                <h2 className="subtitle">A Progressive app POC</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="column container">
          <div className="box">
            <p>
              {this._counter.render(this._counterValue)}
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
      </app>
    );
  }
}

export class EventsHandlers extends MultithreadItEventsHandler {
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

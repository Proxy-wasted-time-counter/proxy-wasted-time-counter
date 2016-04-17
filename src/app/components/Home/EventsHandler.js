import { MultithreadItEventsHandler } from 'multithread-it';

import { EventsHandlers as WastedTimeAdder } from './wasted-time-adder';
import { EventsHandlers as WastesList } from './wastes-list';
import { EventsHandlers as Counter } from './counter';

export default class EventsHandler extends MultithreadItEventsHandler {
  constructor(workerStore) {
    super(workerStore);

    this._wastesAdderEvents = new WastedTimeAdder(this._worker);
    this._wastesListEvents = new WastesList(this._worker);
    this._counterEvents = new Counter(this._worker);
  }

  register(eventsMap) {
    this._counterEvents.register(eventsMap);
    this._wastesAdderEvents.register(eventsMap);
    this._wastesListEvents.register(eventsMap);
  }
}

import {
  MultithreadItEventsHandler,
  Router
} from 'multithread-it';

import HomeEventsHandler from './Home/EventsHandler';
import * as Report from './Report';

export default class EventsHandlers extends MultithreadItEventsHandler {
  constructor(workerStore) {
    super(workerStore);

    this._routerEvents = new Router.EventsHandler(this._worker);
    this._homeEvents = new HomeEventsHandler(this._worker);
    this._reportEvents = new Report.EventsHandler(this._worker);
  }

  register(eventsMap) {
    this._routerEvents.register(eventsMap);
    this._homeEvents.register(eventsMap);
    this._reportEvents.register(eventsMap);
  }
}

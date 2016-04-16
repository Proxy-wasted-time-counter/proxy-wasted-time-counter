import {
  MultithreadItComponent,
  MultithreadItEventsHandler,
  Router
} from 'multithread-it';

import { persistWastes } from '../worker/storage';

import Header from './header';

import * as Home from './Home';
import * as Report from './Report';

export class Container extends MultithreadItComponent {

  constructor(menuLinks) {
    super();

    this._header = new Header();
    this._router = new Router.Component({
      home: {component: Home.Component},
      report: {component: Report.Component}
    });
  }

  onInit() {
    this.watch(
      state => state.route.current,
      currentRoute => this._routeId = currentRoute
    );
  }

  render() {
    return (
      <app>
        {this._header.render(this._routeId)}
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
        {this._router.render(this._routeId)}
      </app>
    );
  }
}

export class EventsHandlers extends MultithreadItEventsHandler {
  constructor(workerStore) {
    super(workerStore);

    this._routerEvents = new Router.EventsHandler(this._worker);
  }

  register(eventsMap) {
    this._routerEvents.register(eventsMap);
  }
}

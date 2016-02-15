import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';

import Menu from './menu';
import Header from './header';
import * as WastedTimeAdder from './wasted-time-adder';
import WastesList from './wastes-list';

export class Container extends MultithreadItComponent {
  _menuLinks= [];
  _wastes = [];

  _menu;
  header;

  constructor(menuLinks) {
    super();

    this._menu = new Menu();
    this._header = new Header();
    this._wastedTimeAdder = new WastedTimeAdder.Component();
    this._wastesList = new WastesList();

  }

  onInit() {
    this.watch(
      state => state.wastedTime.wastes,
      wastes => this._wastes = wastes
    );
  }

  render() {
    return (
      <app>
        {this._menu.render(this._menuLinks)}
        {this._header.render()}
        <div id="content-wrapper">
          <div class="mui--appbar-height"></div>
          <div class="mui-container-fluid">
            <h1>A Progressive app POC</h1>
            <p>
              {this._wastedTimeAdder.render()}
            </p>
            <div className="mui--divider-top"></div>
            <p>
              {this._wastesList.render(this._wastes)}
            </p>
          </div>
        </div>
        <footer id="footer">
          <div class="mui-container-fluid">
            <br/>
            This is a POC for Breizhcamp 2016
          </div>
        </footer>
      </app>
    );
  }
}

export class EventsHandlers extends MultithreadItEventsHandler {
  constructor(workerStore) {
    super(workerStore);

    this._wastesAdderEvents = new WastedTimeAdder.EventsHandlers(this._worker);
  }

  register(eventsMap) {
    this._wastesAdderEvents.register(eventsMap);
  }
}

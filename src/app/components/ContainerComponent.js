import {
  MultithreadItComponent,
  Router
} from 'multithread-it';

import Header from './header';

import HomeComponent from './Home/Component';
import * as Report from './Report';

export default class Container extends MultithreadItComponent {

  constructor(menuLinks) {
    super();

    this._header = new Header();
    this._router = new Router.Component({
      home: {component: HomeComponent},
      report: {component: Report.Component}
    });
  }

  onInit() {
    this._router.setStore(this._store);
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

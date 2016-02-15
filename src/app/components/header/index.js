import { MultithreadItComponent } from 'multithread-it';

export default class Header extends MultithreadItComponent {
  render() {
    return (
      <header >
        <div className="mui-appbar mui--appbar-line-height">
          <div className="mui-container-fluid">
            <a className="sidedrawer-toggle mui--visible-xs-inline-block js-show-sidedrawer" ev-click={ev => this._toggleMenu(ev)}>☰</a>
            <a className="sidedrawer-toggle mui--hidden-xs js-hide-sidedrawer" ev-click={ev => this._toggleMenu(ev)}>☰</a>
            <span className="mui--text-title mui--visible-xs-inline-block">PWTC</span>
          </div>
        </div>
      </header>
    );
  }
}

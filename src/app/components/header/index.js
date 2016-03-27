import { MultithreadItComponent } from 'multithread-it';

export default class Header extends MultithreadItComponent {
  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="header-left">
            <a className="header-item" href="#">
              <img src="img/icon-48.png" alt="Logo" />
            </a>
            <a className="header-tab is-active" href="#">
              PWTC
            </a>
          </div>

          <span className="header-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div className="header-right header-menu">
            <span className="header-item">
              <a href="#">Poxy-Wasted-Time-Counter</a>
            </span>
          </div>
        </div>
      </header>
    );
  }
}

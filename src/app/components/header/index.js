import {
  MultithreadItComponent,
  Router
} from 'multithread-it';
import classNames from 'classnames';

export default class Header extends MultithreadItComponent {
  render(routeId) {
    const homeMenuClasses = classNames({
      'nav-item': true,
      'is-tab': true,
      'is-active': routeId === 'home'
    });
    const reportMenuClasses = classNames({
      'nav-item': true,
      'is-tab': true,
      'is-active': routeId === 'report'
    });

    return (
      <header className="hero-head">
        <div className="container">
          <nav className="nav">
            <div className="nav-left">
              <a href="#" className="nav-item">
                <img data-click={Router.CHANGE_ROUTE} data-link="home" src="img/icon-48.png" alt="Logo" />
              </a>
              <a href="#" data-click={Router.CHANGE_ROUTE} data-link="home" className={homeMenuClasses}>
                PWTC
              </a>
              <a href="#" data-click={Router.CHANGE_ROUTE} data-link="report" className={reportMenuClasses}>
                Report
              </a>
            </div>
            <div className="nav-right nav-menu">
              <span data-click={Router.CHANGE_ROUTE} data-link="home" className="nav-item">
                <a href="#">Poxy-Wasted-Time-Counter</a>
              </span>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

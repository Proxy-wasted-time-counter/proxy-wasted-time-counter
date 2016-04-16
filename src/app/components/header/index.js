import {
  MultithreadItComponent,
  Router
} from 'multithread-it';
import classNames from 'classnames';

export default class Header extends MultithreadItComponent {
  render(routeId) {
    const homeMenuClasses = classNames({
      'header-tab': true,
      'is-active': routeId === 'home'
    });
    const reportMenuClasses = classNames({
      'header-tab': true,
      'is-active': routeId === 'report'
    });

    return (
      <header className="header">
        <div className="container">
          <div className="header-left">
            <a href="#" data-click={Router.CHANGE_ROUTE} data-link="home" className="header-item">
              <img src="img/icon-48.png" alt="Logo" />
            </a>
            <a href="#" data-click={Router.CHANGE_ROUTE} data-link="home" className={homeMenuClasses}>
              PWTC
            </a>
            <a href="#" data-click={Router.CHANGE_ROUTE} data-link="report" className={reportMenuClasses}>
              Report
            </a>
          </div>
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

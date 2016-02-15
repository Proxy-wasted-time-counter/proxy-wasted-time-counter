import { MultithreadItComponent } from 'multithread-it';

export default class Menu extends MultithreadItComponent {

  render(links) {
    function createLink(link) {
      return (
        <li><a className="mdl-navigation__link" href="{link.href}">{link.title}</a></li>
      );
    }

    return (
      <div id="sidedrawer" className="mui--no-user-select">
        <div id="sidedrawer-brand" className="mui--appbar-line-height mui--text-title">PWTC</div>
        <div className="mui-divider"></div>
        <ul>
          {links.map(createLink)}
        </ul>
      </div>
    );
  }
}

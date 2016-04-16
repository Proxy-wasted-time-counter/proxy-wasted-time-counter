import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';
import moment from 'moment';

export default class Component extends MultithreadItComponent {

  render(wastesPerMonth) {

    let jsx;
    const current = wastesPerMonth[moment().format('MM/YYYY')];
    if (current) {
      const humanized = current.humanizedTotal;
      const time = `${current.humanizedTotal} (${current.total} seconds)`;

      jsx = (
        <div className="container has-text-centered">
          <h3 className="title">This month</h3>
          <h3 className="subtitle">You waste</h3>

          <div className="counter-value">{time}</div>
        </div>
      );
    } else {
      jsx = <div>No wastes currently recorded</div>;
    }
    return jsx;
  }
}

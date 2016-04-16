import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';

export default class Component extends MultithreadItComponent {

  render(wastesPerMonth) {

    function createLine(month) {
      const time = `${wastesPerMonth[month].humanizedTotal} (${wastesPerMonth[month].total} seconds)`;
      return (
        <tr>
          <td textContent={month}></td>
          <td textContent={time}></td>
        </tr>
      );
    }
    let jsx;
    const nbMonthsRegistered = Object.keys(wastesPerMonth).length;
    if (nbMonthsRegistered > 0) {
      jsx = (
        <table className="table is-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(wastesPerMonth).map(createLine)}
          </tbody>
        </table>
      );
    } else {
      jsx = <div>No wastes currently recorded</div>;
    }
    return jsx;
  }
}

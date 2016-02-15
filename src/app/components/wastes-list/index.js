import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';

export default class WastesList extends MultithreadItComponent {

  render(wastes) {

    function createLine(waste) {
      return (
        <tr>
          <td textContent={waste.date.toLocaleDateString()}></td>
          <td textContent={waste.time}></td>
        </tr>
      );
    }
    return (
      <table className="mui-table mui-table--bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {wastes.map(createLine)}
        </tbody>
      </table>
    );
  }
}

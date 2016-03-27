import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';

export default class WastesList extends MultithreadItComponent {

  render(wastes) {

    function createLine(waste) {
      const date = new Date(waste.date);
      return (
        <tr>
          <td textContent={date.toLocaleDateString()}></td>
          <td textContent={waste.time}></td>
        </tr>
      );
    }
    return (
      <table className="table is-striped">
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

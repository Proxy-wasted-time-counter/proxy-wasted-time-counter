import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';
import * as ActionTypes from '../../constants/ActionTypes';

const COMP_ID = 'WASTES_LIST';

export class Component extends MultithreadItComponent {

  render(wastes) {

    function createLine(waste) {
      const date = new Date(waste.date);
      const timeSpend = `${waste.time} ${waste.unit}`;
      return (
        <tr>
          <td textContent={date.toLocaleDateString()}></td>
          <td textContent={timeSpend}></td>
          <td>
            <button data-click={COMP_ID} waste-id={waste.id} className="button is-danger is-outlined">
              Delete
            </button>
          </td>
        </tr>
      );
    }
    let jsx;
    if (wastes.length > 0) {
      jsx = (
        <table className="table is-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {wastes.map(createLine)}
          </tbody>
        </table>
      );
    } else {
      jsx = <div>No wastes currently recorded</div>;
    }
    return jsx;
  }
}

export class EventsHandlers extends MultithreadItEventsHandler {
  constructor(workerStore) {
    super(workerStore);

    this.addEventHandlers(
      'click',
      e => this._onDelete(e)
    );
  }

  _onDelete(e) {
    const target = e.target;
    if (target['data-click'] === COMP_ID) {
      e.preventDefault();
      const idToDelete = target['waste-id'];
      this._worker.dispatchEvent(
        ActionTypes.DELETE_WASTE,
        idToDelete
      );
    }
  }
}

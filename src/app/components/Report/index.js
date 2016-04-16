import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';

export class Component extends MultithreadItComponent {

  render() {
    return (
      <div className="column container">
        <div className="box">
          <p>
            Report
          </p>
        </div>
      </div>
    );
  }
}

export class EventsHandlers extends MultithreadItEventsHandler {
  constructor(workerStore) {
    super(workerStore);
  }

  register(eventsMap) {
  }
}

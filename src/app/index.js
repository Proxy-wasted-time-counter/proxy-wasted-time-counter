import { App } from 'multithread-it';
import './service-worker-registration';

import { EventsHandlers as ContainerEventsHandlers } from './components/Container';
import AppWorker from 'worker!./worker';
import './connection-listener';

const appContainer = document.querySelector('#app-container');

App(
  appContainer,
  ContainerEventsHandlers,
  AppWorker
);

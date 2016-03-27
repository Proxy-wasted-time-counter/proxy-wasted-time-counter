import { App } from 'multithread-it';
import './service-worker-registration';

import { EventsHandlers as ContainerEventsHandlers } from './app/components/Container';
import AppWorker from 'worker!./app/worker';
import './app/connection-listener';

const appContainer = document.querySelector('#app-container');

App(
  appContainer,
  ContainerEventsHandlers,
  AppWorker
);


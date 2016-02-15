import { App } from 'multithread-it';

import { EventsHandlers as ContainerEventsHandlers } from './app/components/Container';
import AppWorker from 'worker!./app/worker';

const appContainer = document.querySelector('#app-container');

App(
  appContainer,
  ContainerEventsHandlers,
  AppWorker
);


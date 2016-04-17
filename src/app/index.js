import { App } from 'multithread-it';
import './service-worker-registration';

import ContainerEventsHandlers from './components/ContainerEventsHandler';
import AppWorker from 'worker!./worker';
import './connection-listener';

const appContainer = document.querySelector('#app-container');

App(
  appContainer,
  ContainerEventsHandlers,
  AppWorker
);

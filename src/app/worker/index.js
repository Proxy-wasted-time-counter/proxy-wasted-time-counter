import { Worker } from 'multithread-it';

import * as reducers from './reducers';
import actionsCreator from './actions-creator';

import {
  init as initStorage,
  getPouchDbState
} from './storage';

import ContainerComponent from '../components/ContainerComponent';

const app = new ContainerComponent();

getPouchDbState()
.then(state => {
  const store = Worker.subscribeAppToChanges(app, actionsCreator, reducers, state);
  initStorage(store);
});

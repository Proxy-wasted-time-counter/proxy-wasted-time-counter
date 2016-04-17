import { Worker } from 'multithread-it';

import * as reducers from './reducers';
import actionsCreator from './actions-creator';

import { getInitialState } from './storage';

import ContainerComponent from '../components/ContainerComponent';

const app = new ContainerComponent();

getInitialState()
.then(initState => Worker.subscribeAppToChanges(app, actionsCreator, reducers, initState));

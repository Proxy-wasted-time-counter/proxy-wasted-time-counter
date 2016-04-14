import { Worker } from 'multithread-it';

import * as reducers from './reducers';
import actionsCreator from './actions-creator';

import { getInitialState } from './storage';

import { Container as ContainerComponent } from '../components/Container';

const app = new ContainerComponent();

getInitialState()
.then(initState => Worker.subscribeAppToChanges(app, actionsCreator, reducers, initState));

import PouchDB from 'pouchdb';
import PouchDBUpsert from 'pouchdb-upsert';

import * as ActionTypes from '../../constants/ActionTypes';
import actionsCreator from '../actions-creator';

PouchDB.plugin(PouchDBUpsert);

const localDB = new PouchDB('pwtc-state');
const remoteDB = new PouchDB('https://pennarun-demo.io/couchdb/pwtc-state');

export function init(store) {
  remoteDB.replicate.to(localDB);
  localDB.sync(remoteDB, {
    live: true,
    retry: true
  })
  .on('change', updatedWatedTime)
  .on('complete', updatedWatedTime)
  .on('error', err => {
    console.error('[STORAGE] : Error Synchronized with remote DB');
  });
  function updatedWatedTime() {
    getPouchDbState()
    .then(data => {
      store.dispatch(
        actionsCreator[ActionTypes.UPDATE_WASTED_TIME](data.wastedTime)
      );
    });
  }
}

const WASTES_ID = 'wastes';

export function getPouchDbState() {
  return localDB.get(WASTES_ID)
  .then(dbWastes => {
    return {
      wastedTime: {
        wastes: dbWastes.wastes,
        perMonth: dbWastes.perMonth
      }
    };
  })
  .catch(e => {
    console.log(e);
    return {
      wastedTime: {
        wastes: [],
        perMonth: {}
      }
    };
  });
}

export function persistWastes(wastedTime) {
  localDB.upsert(WASTES_ID, dbWastes => {
    return {
      ...dbWastes,
      wastes: wastedTime.wastes,
      perMonth: wastedTime.perMonth
    };
  });
}

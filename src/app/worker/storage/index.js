import PouchDB from 'pouchdb';
import PouchDBUpsert from 'pouchdb-upsert';

PouchDB.plugin(PouchDBUpsert);

const localDB = new PouchDB('pwtc-state');
const remoteDB = new PouchDB('http://localhost:3000/couchdb/pwtc-state');

const syncDone = Promise.defer();
localDB.sync(remoteDB, {
  live: true,
  retry: true
})
.on('complete', info => {
  console.log('Replication completed', info);
  syncDone.resolve();
})
.on('change', () => {
  console.log('[STORAGE] : Synchronized with remote DB');
}).on('error', err => {
  console.error('[STORAGE] : Error Synchronized with remote DB');
});

const WASTES_ID = 'wastes';

export function getInitialState() {
  return syncDone.promise
  .then(() => localDB.get(WASTES_ID))
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
  })
  // .catch(e => {
  //   return localDB.put({
  //     _id: WASTES_ID,
  //     wastes: wastedTime.wastes,
  //     perMonth: wastedTime.perMonth
  //   });
  // });
}

import PouchDB from 'pouchdb';

const localDB = new PouchDB('pwtc-state');

const remoteDB = new PouchDB('/couchdb/pwtc-state');

localDB.sync(remoteDB, {
  live: true,
  retry: true
})
.on('change', function() {
  console.log('[STORAGE] : Synchronized with remote DB');
}).on('error', function(err) {
  console.error('[STORAGE] : Error Synchronized with remote DB');
});

const WASTES_ID = 'wastes';

export function getInitialState() {
  return localDB.get(WASTES_ID)
  .then(dbWastes => {
    return {
      wastedTime: {
        wastes: dbWastes.wastes
      }
    };
  })
  .catch(e => {
    console.log(e);
    return {
      wastedTime: {
        wastes: []
      }
    };
  });
}

export function persistWastes(wastes) {
  localDB.get(WASTES_ID)
  .then(dbWastes => {
    dbWastes.wastes = wastes;
    return localDB.put(dbWastes);
  })
  .catch(e => {
    return localDB.put({
      _id: WASTES_ID,
      wastes: wastes
    });
  });
}

import {openDB} from 'idb';

export const initdb = async () => {
  await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', {keyPath: 'id', autoIncrement: true});
      console.log('jate database created');
    },
  });
};

initdb();

export const putDb = async (content) => {
  try {
    const jateDb = await openDB('jate', 1);

    const trans = jateDb.transaction('jate', 'readwrite');

    const store = trans.objectStore('jate');

    return store.add({content: content});

  } catch (err) {
    console.error('putDb not implemented', err)
  }
};


export const getDb = async () => {
  try {
    const jateDb = await openDB('jate', 1);
    const trans = jateDb.transaction('jate', 'readonly');
    const store = trans.objectStore('jate');
    const result = await store.getAll();
    console.log('result', result);
    if (result && result.length > 0) {
      return result[0].content; // Return the content of the first entry.
    }
    return null; // Return null if no entries are found.
  } catch (err) {
    console.error('getDb not implemented', err)
  }
};


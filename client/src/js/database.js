import { openDB } from "idb";

const initdb = async () =>
  openDB("jateDb", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

//Put new data to the DB when the window looses focus
  export const putDb = async (content) => {
  console.log("PUT to the database");
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jateDb", 1);
  // Create a new transaction and specify the store and data privileges. Open up the desired object store.
  const store = jateDb.transaction("jate", "readwrite").objectStore("jate");
  // Use the .put() method to store the data in id:1.
  const request = store.put({ id: 1, value: content });
  // Get confirmation of the request.
  const result = await request;
  console.log('Data Saved', result)
  return result;
};

//Get all data from the database
export const getDb = async () => {
  console.log("GET from the database");
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jateDb", 1);
  // Create a new transaction and specify the store and data privileges. Open up the desired object store.
  const store = jateDb.transaction("jate", "readonly").objectStore("jate");
  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();
  // Get confirmation of the request.
  const result = await request;
  return result[0].value;
};

initdb();

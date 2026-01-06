import { getDB } from "../database/db"

export function runTransaction(storeName, mode, operationFn) {
  return new Promise((resolve, reject) => {
    const db = getDB();
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);

    const request = operationFn(store);

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);

    tx.oncomplete = () => console.log(`${storeName} transaction complete`);
    tx.onerror = (event) => reject(event.target.error);
  });
}
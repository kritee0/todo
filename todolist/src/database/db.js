
let db;

export function initDB() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("todoAppDB", 1);

    request.onerror = (event) => {
      console.error("Database error:", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log("Database opened successfully");
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;

     
      if (!db.objectStoreNames.contains("projects")) {
        const projectStore = db.createObjectStore("projects", {
          keyPath: "id",
          autoIncrement: true,
        });
        projectStore.createIndex("name", "name", { unique: true });
      }

   
      if (!db.objectStoreNames.contains("tasks")) {
        const taskStore = db.createObjectStore("tasks", {
          keyPath: "id",
          autoIncrement: true,
        });

    
        taskStore.createIndex("projectId", "projectId", { unique: false });
        taskStore.createIndex("completed", "completed", { unique: false }); 
        taskStore.createIndex("priority", "priority", { unique: false });   
        taskStore.createIndex("deadline", "deadline", { unique: false });   
      }
    };
  });
}

export function getDB() {
  if (!db) {
    throw new Error("DB not initialized. Call initDB() first.");
  }
  return db;
}
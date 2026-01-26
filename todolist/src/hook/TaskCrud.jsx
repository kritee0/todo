import { runTransaction } from "../database/transaction";

//runTransaction("storeName", "mode", (store) => store.operation(data));
export function addTask(task) {
  const result=runTransaction("tasks", "readwrite", (store) => store.add(task));
 
  return result
  
}
// export function getTaskByProjectId(projectId) {
//   return runTransaction("tasks", "readonly", (store) => store.get(projectId))
//     .then(tasks => tasks.filter(task => task.projectId === Number(projectId)));
// }
// export function getTaskByProjectId(projectId) {
//   return runTransaction("tasks", "readonly", (store) => store.getAll())
//     .then(tasks =>{ tasks.filter(task => task.projectId === Number(projectId)))};
// }
export function getTaskByProjectId(projectId) {
  return runTransaction("tasks", "readonly", (store) => store.getAll())
    .then(tasks => {
      console.log("All tasks:", tasks);  
      const filteredTask= tasks.filter(task => Number(task.projectId) === Number(projectId));  
      console.log( "filter atsk is",filteredTask)
      return filteredTask
         
    });  
}
export function getTasks(){
    return runTransaction("tasks","readonly",(store)=>store.getAll())
}
export function updateTask(task){
    return runTransaction("tasks","readwrite",(store)=>store.put(task))
}

export function deleteTask(id){
    return runTransaction("tasks","readwrite",(store)=>store.delete(id))
}
export function deleteTasksByProjectId(projectId) {
  return runTransaction("tasks", "readwrite", (store) => {
    const index = store.index("projectId");
    const range = IDBKeyRange.only(Number(projectId));
    return index.openCursor(range).then(function deleteAll(cursor) {
      if (!cursor) return;
      cursor.delete();
      return cursor.continue().then(deleteAll);
    });
  });
}

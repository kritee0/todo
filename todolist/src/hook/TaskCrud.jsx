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
      return tasks.filter(task => Number(task.projectId) === Number(projectId));
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

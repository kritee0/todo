import { runTransaction } from "../database/transaction";

//runTransaction("storeName", "mode", (store) => store.operation(data));
export function addProject(projects) {
  return runTransaction("projects", "readwrite", (store) => store.add(projects));
}
export function getProject(){
    return runTransaction("projects","readonly",(store)=>store.getAll())
}
export function getProjectById(id){
    return runTransaction("projects","readonly",(store)=>store.get(id))
}

export function updateProject(projects){
    return runTransaction("projects","readwrite",(store)=>store.put(projects))
}

export function deleteProject(id){
    return runTransaction("projects","readwrite",(store)=>store.delete(id))
}

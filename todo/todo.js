const { log } = require('console')
const fs = require('fs')
const filePath = "./tasks.json"

//load data from file 
const loadTask = () =>{
    try {
        const databuffer = fs.readFileSync(filePath)
        //conver into string 
        const dataJson = databuffer.toString()
        return JSON.parse(dataJson)
    } catch (error) {
        return [] 
    }
}

// save data into file  or write data into file 
const saveTasks = (tasks)=>{
   const dataJSON =  JSON.stringify(tasks)
   fs.writeFileSync(filePath, dataJSON)

}
const addTask = (task ) =>{
    const tasks = loadTask()
    tasks.push({task})
    saveTasks(tasks)
    console.log("tasks is added");
    
}

const listTask = () =>{
   const tasks =  loadTask();
   tasks.forEach((tasks, index)=>console.log(`${index + 1} - ${tasks.task}`)
   );
}
//take command from command line 

const removeTask=(argumnet)=>{
    const tasks = loadTask();
    const deleteTask = tasks.filter((task)=>task.task != argumnet)
    //console.log(deleteTask);
    saveTasks(deleteTask)
    
}

const command = process.argv[2]
const argumnet = process.argv[3]

//commandas 
if(command === 'add'){
    addTask(argumnet)
}else if (command === 'list'){
    listTask()
}else if (command === 'remove'){
    removeTask(argumnet)
}else{
    console.log("command is not found");
}
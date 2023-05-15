import React, { useState } from "react";
import { TodoList } from "./TodoList/TodoList";
import uniqid from 'uniqid';
import "./App.css";



export type FilterValuesType = "all" | "completed" | "active";

export type TodoListsType = {
    id:string,
    title:string,
    filter:FilterValuesType
}

function App() {
 

  const addTask =(title:string, todoListId:string)=>{


    const newTask = {id:uniqid(), title, isDone:false};
    let tasks =tasksObj[todoListId];
    const newTasks = [newTask,...tasks];
    tasksObj[todoListId] = newTasks;
    setTasks({...tasksObj});
  }

  const removeTask = (id: string, todoListId:string) => {
    let tasks  =tasksObj[todoListId]
    let filteredTasks = tasks.filter((task) => task.id !== id);
     tasksObj[todoListId]= filteredTasks 
    setTasks({...tasksObj});
  };

  const changeStatus = (taskId:string, isDone:boolean,todoListId:string) =>{
    let tasks  =tasksObj[todoListId];

    let task = tasks.find(task =>task.id === taskId);
    if(task){
      task.isDone = isDone;
    }
    setTasks({...tasksObj})
  }

  

 
  const changeFilter = (value: FilterValuesType,todoListId:string) =>{
    let todoList = todoLists.find(tl=>tl.id===todoListId);
    if(todoList){
      todoList.filter=value;
    }
    setTodoLists([...todoLists])
  };

  const removeTodoList = (todoListId:string)=>{
    const filteredTodoLists = todoLists.filter(tl=>tl.id !== todoListId);
    setTodoLists([...filteredTodoLists]);
    delete tasksObj[todoListId];
    setTasks({...tasksObj})
  }

  const todoListId1 = uniqid();
  const todoListId2 = uniqid()

  let [todoLists,setTodoLists] =useState<Array<TodoListsType>>( [
    {id:todoListId1, title:"What to learn", filter:"active"},
    {id:todoListId2, title:"What to buy", filter:"completed"}
  ])

  const[ tasksObj,setTasks] = useState({
    [todoListId1]:[
      { id: uniqid(), title: "CSS", isDone: true },
      { id: uniqid(), title: "HTML", isDone: true },
      { id: uniqid(), title: "JS", isDone: false },
      { id: uniqid(), title: "React", isDone: false },
      { id: uniqid(), title: "Redux", isDone: false },
    ],
    [todoListId2]:[
      { id: uniqid(), title: "Book", isDone: true },
      { id: uniqid(), title: "NoteBook", isDone: true },
      { id: uniqid(), title: "Phone", isDone: false },
      { id: uniqid(), title: "TextPad", isDone: false },
     ]
  })

  return (
    <div className="App">
      {todoLists.map(tl=>{
         let taskForTodoList = tasksObj[tl.id];

         if (tl.filter === "completed") {
           taskForTodoList = taskForTodoList.filter((task) => task.isDone === true);
         }
       
         if (tl.filter === "active") {
           taskForTodoList = taskForTodoList.filter((task) => task.isDone === false);
         }
      return  <TodoList
        key={tl.id}
        id={tl.id}
        title={tl.title}
        tasks={taskForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask = {addTask}
        changeStatus = {changeStatus}
        filter={tl.filter}
        removeTodoList={removeTodoList}
      />
    })}
     
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { TaskType, TodoList } from "./TodoList/TodoList";
import uniqid from 'uniqid';
import "./App.css";



export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: uniqid(), title: "CSS", isDone: true },
    { id: uniqid(), title: "HTML", isDone: true },
    { id: uniqid(), title: "JS", isDone: false },
    { id: uniqid(), title: "React", isDone: false },
    { id: uniqid(), title: "Redux", isDone: false },
  ]);

  const addTask =(title:string)=>{
    const newTask = {id:uniqid(), title, isDone:false};
    const newTasks = [newTask,...tasks];
    setTasks(newTasks);
  }

  const removeTask = (id: string) => {
    let resultTasks = tasks.filter((task) => task.id !== id);
    setTasks(resultTasks);
  };

  const changeStatus = (taskId:string, isDone:boolean) =>{

    let task = tasks.find(task =>task.id === taskId);
    if(task){
      task.isDone = isDone;
    }
    setTasks([...tasks])
  }

  let [filter, setFilter] = useState<FilterValuesType>("all");

  let taskForTodoList = tasks;

  if (filter === "completed") {
    taskForTodoList = tasks.filter((task) => task.isDone === true);
  }

  if (filter === "active") {
    taskForTodoList = tasks.filter((task) => task.isDone === false);
  }
  const changeFilter = (value: FilterValuesType) => setFilter(value);

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={taskForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask = {addTask}
        changeStatus = {changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;

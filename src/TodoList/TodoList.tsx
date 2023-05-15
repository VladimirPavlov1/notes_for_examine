import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropTypes = {
  id:string,
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string,todoListId:string) => void;
  changeFilter: (value: FilterValuesType,todoListId:string) => void;
  addTask: (title: string,todoListId:string) => void;
  changeStatus:(id:string, isDone:boolean,todoListId:string)=>void;
  filter:FilterValuesType,
  removeTodoList:(todoListId:string)=>void;
};

export function TodoList(props: PropTypes) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string|null>(null)

  const onNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      props.addTask(newTaskTitle,props.id);
      setNewTaskTitle("");
    }
  };

  const addTask = () => {
    if(newTaskTitle.trim()!==''){
        props.addTask(newTaskTitle.trim(),props.id);
        setNewTaskTitle("");
    }else{
        setError("Title is required")
    }
  };

  const onAllClickHandler =()=> props.changeFilter("all",props.id);
  const onActiveClickHandler =()=> props.changeFilter("active",props.id);
  const onCompletedClickHandler =()=> props.changeFilter("completed",props.id);
  const removeTodoList=()=>{
    props.removeTodoList(props.id)
  }
  return (

  
    <div>
      <h3>{props.title}
        <button onClick={removeTodoList}>x</button>
      </h3>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={onNewTitleChange}
          onKeyDown={onKeyDownHandler}
          className={error?"error":""}
        />
        <button onClick={addTask}>+</button>
        {error&&<div className="error-message">Field is required</div>}
      </div>
      <ul>
        {props.tasks.map((task) => {
              const onRemoveBtnClick = ()=>{props.removeTask(task.id,props.id)};
              const onChangeStatusHandler=(e:ChangeEvent<HTMLInputElement>)=>{props.changeStatus(task.id,e.currentTarget.checked,props.id)}
          return (
            <li key={task.id} className={task.isDone?"is-done":""}>

              <input type="checkbox" checked={task.isDone} onChange = {onChangeStatusHandler} />
              
              <span>{task.title}</span>
              
              <button onClick={onRemoveBtnClick}>
                x
              </button>

            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler}  className={props.filter==="all"?"active-filter":""}>
          All
        </button>
        <button onClick={onActiveClickHandler}  className={props.filter==="active"?"active-filter":""}>
          Active
        </button>
        <button onClick={onCompletedClickHandler}  className={props.filter==="completed"?"active-filter":""}>
          Completed
        </button>
      </div>
    </div>
  );
}

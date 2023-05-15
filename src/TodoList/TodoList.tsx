import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropTypes = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeStatus:(id:string, isDone:boolean)=>void;
  filter:FilterValuesType,
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
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const addTask = () => {
    if(newTaskTitle.trim()!==''){
        props.addTask(newTaskTitle.trim());
        setNewTaskTitle("");
    }else{
        setError("Title is required")
    }
  };

  const onAllClickHandler =()=> props.changeFilter("all");
  const onActiveClickHandler =()=> props.changeFilter("active");
  const onCompletedClickHandler =()=> props.changeFilter("completed");

  return (

  
    <div>
      <h3>{props.title}</h3>
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
              const onRemoveBtnClick = ()=>{props.removeTask(task.id)};
              const onChangeStatusHandler=(e:ChangeEvent<HTMLInputElement>)=>{props.changeStatus(task.id,e.currentTarget.checked)}
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

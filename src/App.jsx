import { useState } from "react";

const initialTasks = [
    {id: '0', checked: true, name: 'eat'},
    {id: '1',checked: false, name: 'sleep'},
    {id: '2',checked: true, name: 'code'}
];

function Header() {
  return <h1>TO-DO LIST APP</h1>;
}

function TaskForm({ text, setText, addTask}) {
  return (
    <>
    <div className="box">
    <form onSubmit={addTask}>
      <input type="text" value={text} className="field" onChange={(e) => setText(e.target.value)}/>
      <input type="submit" value="Add" className="submit-button"/>
    </form>
    </div>
    
    </>
  )
}

function List({ tasks, toggleTask}) {
  return (
    <>
    <div className="box">
      {tasks.map((task) => (
        <div className="line" key={task.id}>
          <input type="checkbox" checked={task.checked} onChange={() => toggleTask(task.id)}/>
          <span> {task.name} </span>
          <div className="edit"></div>
          <span>🗑️</span>
          <span>🖊</span>
        </div>
      ))}
    </div>
    </>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setText] = useState("");

  function addTask(e) {
    e.preventDefault();

    if (text.trim() === "") return;

    const newTask = {
      id: crypto.randomUUID(),
      checked: false,
      name: text
    };

    setTasks(prev => [...prev,newTask]);
    setText("");
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, checked: !task.checked }
          : task
      )
    );
  }
  return (
    <>
      <Header />
      <TaskForm text={text} setText={setText} addTask={addTask}/>
      <List tasks={tasks} toggleTask={toggleTask}/>
    </>
  );
}
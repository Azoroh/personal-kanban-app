import { useState } from "react";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    title: "Learn React",
    status: "todo",
  },
  {
    id: 2,
    title: "Next.Js Tutorial",
    status: "todo",
  },
  {
    id: 3,
    title: "Run 5k",
    status: "doing",
  },
  {
    id: 4,
    title: "Eat Breakfast",
    status: "done",
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(newTask) {
    setTasks((tasks) => [...tasks, newTask]);
  }

  function handleMove(status, taskItem) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskItem.id ? { ...task, status: status } : task,
      ),
    );
  }

  function handleDelete(taskItem) {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskItem.id));
  }

  return (
    <div className="app">
      <h1 className="app-title">Kanban Board</h1>

      <div className="board">
        <TodoBoard
          tasks={tasks}
          onAddTask={handleAddTask}
          onMove={handleMove}
        />

        <DoingBoard tasks={tasks} onMove={handleMove} />

        <DoneBoard tasks={tasks} onDelete={handleDelete} />
      </div>
    </div>
  );
}

function TodoBoard({ tasks, onAddTask, onMove }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!task) return;

    const newTask = { id: crypto.randomUUID(), title: task, status: "todo" };
    onAddTask(newTask);

    setTask("");
  }

  return (
    <section className="column">
      <h2 className="column-title">Todo</h2>

      <div className="task-list">
        {tasks.map(
          (task) =>
            task.status === "todo" && (
              <TaskCard key={task.id} task={task}>
                <h3>{task.title}</h3>
                <button className="btn" onClick={() => onMove("doing", task)}>
                  Move to Doing
                </button>
              </TaskCard>
            ),
        )}
      </div>

      <form className="add-task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New task..."
        />
        <button className="btn">Add</button>
      </form>
    </section>
  );
}

function DoingBoard({ tasks, onMove }) {
  return (
    <section className="column">
      <h2 className="column-title">Doing</h2>

      <div className="task-list">
        {tasks.map(
          (task) =>
            task.status === "doing" && (
              <TaskCard key={task.id} task={task}>
                <h3>{task.title}</h3>
                <button
                  className="btn success"
                  onClick={() => onMove("done", task)}
                >
                  Move to Done
                </button>
              </TaskCard>
            ),
        )}
      </div>
    </section>
  );
}

function DoneBoard({ tasks, onDelete }) {
  return (
    <section className="column">
      <h2 className="column-title">Done</h2>

      <div className="task-list">
        {tasks.map(
          (task) =>
            task.status === "done" && (
              <TaskCard key={task.id} task={task}>
                <h3>{task.title}</h3>
                <button className="btn danger" onClick={() => onDelete(task)}>
                  Delete
                </button>
              </TaskCard>
            ),
        )}
      </div>
    </section>
  );
}

function TaskCard({ children }) {
  // console.log(task);
  return <div className="task-card">{children}</div>;
}

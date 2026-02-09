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

  function handleMoveTask(taskId, nextStatus) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: nextStatus } : task,
      ),
    );
  }

  function handleAddTask(newTask) {
    setTasks((tasks) => [...tasks, newTask]);
  }

  function handleDelete(taskId) {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  return (
    <div className="app">
      <div className="app-title">Kanban Board</div>
      <div className="board">
        <Board
          tasks={tasks}
          title="Todo"
          status="todo"
          actionLabel="Move to Doing"
          onClick={(id) => handleMoveTask(id, "doing")}
          onAddTask={handleAddTask}
        />

        <Board
          tasks={tasks}
          title="Doing"
          status="doing"
          actionLabel="Move to Done"
          onClick={(id) => handleMoveTask(id, "done")}
          btnType="success"
        />

        <Board
          tasks={tasks}
          title="Done"
          status="done"
          actionLabel="Delete"
          onClick={handleDelete}
          btnType="danger"
        />
      </div>
    </div>
  );
}

function Board({
  tasks,
  title,
  status,
  actionLabel,
  onAddTask,
  onClick,
  btnType,
}) {
  const [newTask, setNewTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!newTask) return;

    onAddTask({ id: crypto.randomUUID(), title: newTask, status });

    setNewTask("");
  }

  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <section className="column">
      <h2 className="column-title">{title}</h2>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id}>
            <h3>{task.title}</h3>

            <button
              className={`btn ${btnType}`}
              onClick={() => onClick(task.id)}
            >
              {actionLabel}
            </button>
          </TaskCard>
        ))}
      </div>

      {onAddTask && status === "todo" && (
        <form className="add-task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task..."
          />
          <button className="btn">Add</button>
        </form>
      )}
    </section>
  );
}

function TaskCard({ children }) {
  // console.log(task);
  return <div className="task-card">{children}</div>;
}

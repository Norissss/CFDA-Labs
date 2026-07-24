import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  processingTaskId,
}) {
  if (tasks.length === 0) {
    return (
      <p className="empty-message">
        Tidak ada task pada kategori ini.
      </p>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          processingTaskId={
            processingTaskId
          }
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
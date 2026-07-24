function TaskItem({
  task,
  onToggleTask,
  onDeleteTask,
  processingTaskId,
}) {
  const isProcessing =
    processingTaskId === task.id;

  return (
    <li className="task-item">
      <div className="task-content">
        <label className="task-title">
          <input
            type="checkbox"
            checked={task.completed}
            disabled={isProcessing}
            onChange={() =>
              onToggleTask(task.id)
            }
          />

          <span
            className={
              task.completed
                ? "completed"
                : ""
            }
          >
            {task.title}
          </span>
        </label>

        {task.description && (
          <p className="task-description">
            {task.description}
          </p>
        )}

        <div className="task-meta">
          <span
            className={`priority priority-${task.priority}`}
          >
            {task.priority}
          </span>

          {task.dueDate && (
            <span>
              Deadline:{" "}
              {String(task.dueDate).slice(0, 10)}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="delete-button"
        disabled={isProcessing}
        onClick={() =>
          onDeleteTask(task.id)
        }
      >
        {isProcessing
          ? "Proses..."
          : "Hapus"}
      </button>
    </li>
  );
}

export default TaskItem;
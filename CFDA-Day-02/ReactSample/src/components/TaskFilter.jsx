function TaskFilter({ currentFilter, onChangeFilter }) {
  return (
    <div className="filter-container">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => onChangeFilter("all")}
      >
        Semua
      </button>

      <button
        className={currentFilter === "active" ? "active" : ""}
        onClick={() => onChangeFilter("active")}
      >
        Belum Selesai
      </button>

      <button
        className={currentFilter === "completed" ? "active" : ""}
        onClick={() => onChangeFilter("completed")}
      >
        Selesai
      </button>
    </div>
  );
}

export default TaskFilter;
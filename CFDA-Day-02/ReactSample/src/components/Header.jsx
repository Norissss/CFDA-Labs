function Header({ totalTasks, completedTasks }) {
  return (
    <header className="header">
      <h1>React Task Manager</h1>

      <p>
        {completedTasks} dari {totalTasks} tugas selesai
      </p>
    </header>
  );
}

export default Header;
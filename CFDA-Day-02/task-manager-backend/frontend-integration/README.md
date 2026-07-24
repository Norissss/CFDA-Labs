# Integrasi dengan React/Vite

1. Salin `taskApi.js` ke:

```text
frontend-project/
└── src/
    └── services/
        └── taskApi.js
```

2. Buat `.env` pada root project frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

3. Contoh mengambil task:

```jsx
import { useEffect, useState } from 'react';
import { taskApi } from './services/taskApi';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      const response = await taskApi.getAll();
      setTasks(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main>
      {error && <p>{error}</p>}

      {tasks.map((task) => (
        <article key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <button onClick={async () => {
            await taskApi.toggle(task.id);
            await loadTasks();
          }}>
            {task.completed ? 'Batalkan selesai' : 'Selesaikan'}
          </button>
        </article>
      ))}
    </main>
  );
}

export default App;
```

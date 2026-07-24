const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

function normalizeTask(task) {
  return {
    ...task,

    id: task.id,

    title:
      task.title ??
      task.name ??
      "",

    description:
      task.description ??
      "",

    priority:
      task.priority ??
      "medium",

    dueDate:
      task.dueDate ??
      task.due_date ??
      "",

    completed: Boolean(
      task.completed ??
      task.isCompleted ??
      task.is_completed
    ),
  };
}

async function request(path, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    }
  );

  const contentType =
    response.headers.get("content-type");

  let responseData = null;

  if (
    contentType &&
    contentType.includes("application/json")
  ) {
    responseData = await response.json();
  }

  if (!response.ok) {
    throw new Error(
      responseData?.message ??
        `Request gagal dengan status ${response.status}`
    );
  }

  return responseData?.data ?? responseData;
}

export async function getTasks(options = {}) {
  const result = await request("/tasks", {
    method: "GET",
    signal: options.signal,
  });

  const tasks = Array.isArray(result)
    ? result
    : result?.tasks ?? [];

  return tasks.map(normalizeTask);
}

export async function getTaskById(taskId) {
  const result = await request(
    `/tasks/${taskId}`,
    {
      method: "GET",
    }
  );

  const task = result?.task ?? result;

  return normalizeTask(task);
}

export async function createTask(taskData) {
  const result = await request("/tasks", {
    method: "POST",
    body: JSON.stringify(taskData),
  });

  const task = result?.task ?? result;

  return normalizeTask(task);
}

export async function updateTask(
  taskId,
  taskData
) {
  const result = await request(
    `/tasks/${taskId}`,
    {
      method: "PATCH",
      body: JSON.stringify(taskData),
    }
  );

  const task = result?.task ?? result;

  return normalizeTask(task);
}

export async function toggleTask(taskId) {
  const result = await request(
    `/tasks/${taskId}/toggle`,
    {
      method: "PATCH",
    }
  );

  const task = result?.task ?? result;

  return normalizeTask(task);
}

export async function deleteTask(taskId) {
  await request(`/tasks/${taskId}`, {
    method: "DELETE",
  });

  return taskId;
}

export async function getTaskStats() {
  return request("/tasks/stats", {
    method: "GET",
  });
}
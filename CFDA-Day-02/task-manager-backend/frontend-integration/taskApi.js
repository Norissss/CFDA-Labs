const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message ?? 'Request API gagal.');
  }

  return result;
};

export const taskApi = {
  getAll(params = {}) {
    const query = new URLSearchParams(params).toString();
    return request(`/tasks${query ? `?${query}` : ''}`);
  },

  getById(id) {
    return request(`/tasks/${id}`);
  },

  create(payload) {
    return request('/tasks', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  update(id, payload) {
    return request(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
  },

  toggle(id) {
    return request(`/tasks/${id}/toggle`, {
      method: 'PATCH'
    });
  },

  remove(id) {
    return request(`/tasks/${id}`, {
      method: 'DELETE'
    });
  },

  getStats() {
    return request('/tasks/stats');
  }
};

import { useState } from "react";

const initialForm = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
};

function TaskForm({
  onAddTask,
  isSubmitting = false,
}) {
  const [formData, setFormData] =
    useState(initialForm);

  const [validationError, setValidationError] =
    useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle =
      formData.title.trim();

    if (!cleanTitle) {
      setValidationError(
        "Judul task tidak boleh kosong."
      );

      return;
    }

    setValidationError("");

    try {
      await onAddTask({
        title: cleanTitle,

        description:
          formData.description.trim(),

        priority: formData.priority,

        dueDate:
          formData.dueDate || null,
      });

      setFormData(initialForm);
    } catch {
      // Error utama ditampilkan oleh TasksPage.
    }
  }

  return (
    <form
      className="task-form task-form-api"
      onSubmit={handleSubmit}
    >
      <div className="form-group form-group-full">
        <label htmlFor="title">
          Judul Task
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          placeholder="Masukkan judul task"
          disabled={isSubmitting}
          onChange={handleChange}
        />
      </div>

      <div className="form-group form-group-full">
        <label htmlFor="description">
          Deskripsi
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          placeholder="Masukkan deskripsi"
          disabled={isSubmitting}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">
          Prioritas
        </label>

        <select
          id="priority"
          name="priority"
          value={formData.priority}
          disabled={isSubmitting}
          onChange={handleChange}
        >
          <option value="low">
            Low
          </option>

          <option value="medium">
            Medium
          </option>

          <option value="high">
            High
          </option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">
          Deadline
        </label>

        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          disabled={isSubmitting}
          onChange={handleChange}
        />
      </div>

      {validationError && (
        <p className="form-error form-group-full">
          {validationError}
        </p>
      )}

      <button
        className="form-group-full"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Menyimpan..."
          : "Tambah Task"}
      </button>
    </form>
  );
}

export default TaskForm;
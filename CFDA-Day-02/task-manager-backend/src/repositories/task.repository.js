import pool from '../config/database.js';

const taskColumns = `
  id,
  title,
  description,
  completed,
  priority,
  due_date AS "dueDate",
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

const sortColumns = {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  dueDate: 'due_date',
  title: 'title',
  priority: 'priority'
};

const updateColumnMap = {
  title: 'title',
  description: 'description',
  completed: 'completed',
  priority: 'priority',
  dueDate: 'due_date'
};

export const findAll = async ({
  completed,
  priority,
  search,
  sortBy = 'createdAt',
  order = 'desc'
}) => {
  const conditions = [];
  const values = [];

  if (completed !== undefined) {
    values.push(completed);
    conditions.push(`completed = $${values.length}`);
  }

  if (priority) {
    values.push(priority);
    conditions.push(`priority = $${values.length}`);
  }

  if (search) {
    values.push(`%${search}%`);
    conditions.push(
      `(title ILIKE $${values.length} OR description ILIKE $${values.length})`
    );
  }

  const whereClause = conditions.length > 0
    ? `WHERE ${conditions.join(' AND ')}`
    : '';

  const safeSortColumn = sortColumns[sortBy] ?? sortColumns.createdAt;
  const safeOrder = order === 'asc' ? 'ASC' : 'DESC';

  const query = `
    SELECT ${taskColumns}
    FROM tasks
    ${whereClause}
    ORDER BY ${safeSortColumn} ${safeOrder}, id DESC
  `;

  const result = await pool.query(query, values);
  return result.rows;
};

export const findById = async (id) => {
  const result = await pool.query(
    `SELECT ${taskColumns} FROM tasks WHERE id = $1`,
    [id]
  );

  return result.rows[0] ?? null;
};

export const create = async ({
  title,
  description,
  completed,
  priority,
  dueDate
}) => {
  const result = await pool.query(
    `
      INSERT INTO tasks (title, description, completed, priority, due_date)
      VALUES ($1, $2, $3, $4, $5) /* Binding parameter */
      RETURNING ${taskColumns}
    `,
    [title, description, completed, priority, dueDate]
  );

  return result.rows[0];
};

export const update = async (id, fields) => {
  const entries = Object.entries(fields);
  const values = [];
  const assignments = [];

  for (const [field, value] of entries) {
    values.push(value);
    assignments.push(`${updateColumnMap[field]} = $${values.length}`);
  }

  values.push(id);

  const result = await pool.query(
    `
      UPDATE tasks
      SET
        ${assignments.join(', ')},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $${values.length}
      RETURNING ${taskColumns}
    `,
    values
  );

  return result.rows[0] ?? null;
};

export const toggle = async (id) => {
  const result = await pool.query(
    `
      UPDATE tasks
      SET
        completed = NOT completed,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING ${taskColumns}
    `,
    [id]
  );

  return result.rows[0] ?? null;
};

export const remove = async (id) => {
  const result = await pool.query(
    `DELETE FROM tasks WHERE id = $1 RETURNING id`,
    [id]
  );

  return result.rows[0] ?? null;
};

export const getStats = async () => {
  const result = await pool.query(`
    SELECT
      COUNT(*)::INTEGER AS total,
      COUNT(*) FILTER (WHERE completed = FALSE)::INTEGER AS "activeTasks",
      COUNT(*) FILTER (WHERE completed = TRUE)::INTEGER AS "completedTasks",
      COUNT(*) FILTER (
        WHERE completed = FALSE
          AND due_date IS NOT NULL
          AND due_date < CURRENT_DATE
      )::INTEGER AS "overdueTasks"
    FROM tasks
  `);

  return result.rows[0];
};

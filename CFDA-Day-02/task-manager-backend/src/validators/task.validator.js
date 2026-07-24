import { ApiError } from '../utils/api-error.js';

const ALLOWED_PRIORITIES = new Set(['low', 'medium', 'high']);
const ALLOWED_FIELDS = new Set([
  'title',
  'description',
  'completed',
  'priority',
  'dueDate'
]);

const isValidDateString = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime())
    && date.toISOString().slice(0, 10) === value;
};

const validateTaskFields = (body, { partial }) => {
  const errors = [];
  const sanitized = {};

  const unknownFields = Object.keys(body).filter(
    (field) => !ALLOWED_FIELDS.has(field)
  );

  if (unknownFields.length > 0) {
    errors.push(`Field tidak dikenal: ${unknownFields.join(', ')}.`);
  }

  if (!partial || body.title !== undefined) {
    if (typeof body.title !== 'string' || body.title.trim().length === 0) {
      errors.push('Title wajib berupa teks dan tidak boleh kosong.');
    } else if (body.title.trim().length > 150) {
      errors.push('Title maksimal 150 karakter.');
    } else {
      sanitized.title = body.title.trim();
    }
  }

  if (body.description !== undefined) {
    if (typeof body.description !== 'string') {
      errors.push('Description harus berupa teks.');
    } else if (body.description.length > 2000) {
      errors.push('Description maksimal 2000 karakter.');
    } else {
      sanitized.description = body.description.trim();
    }
  } else if (!partial) {
    sanitized.description = '';
  }

  if (body.completed !== undefined) {
    if (typeof body.completed !== 'boolean') {
      errors.push('Completed harus bernilai true atau false.');
    } else {
      sanitized.completed = body.completed;
    }
  } else if (!partial) {
    sanitized.completed = false;
  }

  if (body.priority !== undefined) {
    if (!ALLOWED_PRIORITIES.has(body.priority)) {
      errors.push('Priority harus bernilai low, medium, atau high.');
    } else {
      sanitized.priority = body.priority;
    }
  } else if (!partial) {
    sanitized.priority = 'medium';
  }

  if (body.dueDate !== undefined) {
    if (body.dueDate === null || body.dueDate === '') {
      sanitized.dueDate = null;
    } else if (typeof body.dueDate !== 'string' || !isValidDateString(body.dueDate)) {
      errors.push('Due date harus menggunakan format YYYY-MM-DD.');
    } else {
      sanitized.dueDate = body.dueDate;
    }
  } else if (!partial) {
    sanitized.dueDate = null;
  }

  if (partial && Object.keys(sanitized).length === 0 && errors.length === 0) {
    errors.push('Minimal satu field task harus dikirim.');
  }

  if (errors.length > 0) {
    throw new ApiError(422, 'Data task tidak valid.', errors);
  }

  return sanitized;
};

export const validateCreateTask = (req, _res, next) => {
  try {
    req.validatedBody = validateTaskFields(req.body ?? {}, { partial: false });
    next();
  } catch (error) {
    next(error);
  }
};

export const validateUpdateTask = (req, _res, next) => {
  try {
    req.validatedBody = validateTaskFields(req.body ?? {}, { partial: true });
    next();
  } catch (error) {
    next(error);
  }
};

export { validateTaskFields };

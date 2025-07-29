function sanitizeObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map((prop) => sanitizeObject(prop));
  }

  if (obj !== null && typeof obj === 'object') {
    const newObj = {};
    for (const key in obj) {
      const value = obj[key];
      if (value === null) {
        newObj[key] = '';
      } else {
        newObj[key] = sanitizeObject(value);
      }
    }
    return newObj;
  }
  return obj;
}

export default sanitizeObject;

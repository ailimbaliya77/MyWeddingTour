export const validate = (schema) => (req, _res, next) => {
  try {
    const result = schema.parse(req.body);
    req.validatedData = result.data;
    next();
  } catch (error) {
    next(error);
  }
};

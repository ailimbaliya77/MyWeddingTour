import { z } from "zod/v3";

export const validate = (schema) => {
  return async (req, _res, next) => {
    try {
      const isZodSchema = (s) => s && typeof s.parse === "function";
      const validated = {};

      schema.query && (validated.query = schema.query.parse(req.query));
      schema.params && (validated.params = schema.params.parse(req.params));

      if (schema.body) {
        if (!isZodSchema(schema.body)) {
          throw new Error("validate(): body schema must be a Zod schema");
        }
        const isMultipart = req.headers["content-type"]?.includes(
          "multipart/form-data"
        );

        if (isMultipart) {
          validated.body = schema.body.parse(req.body);

          if (!req.file) {
            throw new Error("couplePhoto is required");
          }

          const fileSchema = z.object({
            mimetype: z.string().regex(/^image\/(jpeg|png|webp)$/),
            size: z.number().max(5 * 1024 * 1024),
          });

          fileSchema.parse(req.file);

          validated.body.couplePhoto = req.file;
        } else {
          validated.body = schema.body.parse(req.body);
        }
      }

      req.validatedData = validated;
      next();
    } catch (error) {
      next(error);
    }
  };
};

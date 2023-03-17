import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const validateBodyReq = (schema: ZodTypeAny) => async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  const parseBody = schema.parse(req.body);
  req.body = parseBody;
  return next();
}

export default validateBodyReq;
import { Request, Response, NextFunction } from "express";

const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).send("Access denied.");
    }
    next();
  };
};

export default roleMiddleware;

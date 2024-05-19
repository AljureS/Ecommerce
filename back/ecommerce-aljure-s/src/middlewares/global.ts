
import { NextFunction, Request, Response } from 'express';

export function GlobalMiddleware (req: Request, res: Response, next: NextFunction ){
    const timestamp = new Date().toISOString()
    console.log(`Ejecución de un método ${req.method} en ${req.url}, a las ${timestamp}`);
    next();
}
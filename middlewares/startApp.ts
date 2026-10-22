import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";
import { expenseCategories } from "../lib/data";

export function startApp(
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.info("Starting...");

    res.status(200).json("Welcome!!");
}
import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";
import { accounts, expense, expenseCategories } from "../lib/data";


export function listExpense(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = req.body.payload.id;
    const categories = expenseCategories[id];
    res.status(201).json({
        success: true,
        list: categories
    })
}


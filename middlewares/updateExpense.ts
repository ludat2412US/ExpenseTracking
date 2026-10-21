import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";
import { accounts, expense, expenseCategories } from "../lib/data";

export function updateExpense(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const body = req.body as expense;
    const payload = req.body.payload;
    const id = payload.id;


    if (!body) {
        logger.error("Expense categories is empty");
        res.status(401).json({
            success: false,
            message: "Please enter expense categories"
        })
    }

    if (!id) {
        logger.error("Not found userID");
        res.status(402).json({
            success: false,
            message: `Can not find user with ID: ${id}`
        });
    }

    expenseCategories[id] = body

    logger.info("Updated expense");
    res.status(201).json({
        success: true,
        message: `Update expense with ID: ${id} successfully`
    })

}
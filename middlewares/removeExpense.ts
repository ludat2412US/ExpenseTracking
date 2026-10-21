import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";
import { accounts, expenseCategories } from "../lib/data";

export function removeExpense(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = req.body.payload.id;

    if (!id) {
        logger.error("Not found userID");
        res.status(402).json({
            success: false,
            message: `Can not find user with ID: ${id}`
        });
    }
    
    expenseCategories.splice(id, 1);

    logger.info("Removed expense");
    res.status(202).json({
        success: true,
        message: "Remove expense successfully"
    })

}
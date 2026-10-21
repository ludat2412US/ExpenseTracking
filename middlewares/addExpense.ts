import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";
import { expense } from "../lib/data";
import { accounts } from "../lib/data";
import { expenseCategories } from "../lib/data";


export function addExpense(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const {payload, ...body} = req.body;
    const id = payload.id;

    if (!body) {
        res.status(401).json({
            success: false,
            message: "Please enter expenses again"
        })
    }
    
    if (!id) {
        logger.error("Not found userID");
        res.status(402).json({
            success: false,
            message: `Can not find user with ID: ${id}`
        });
    }
    else {
        expenseCategories[id] = body;

        res.status(201).json({
            succes: true,
            message: "Creating an expense successfully!",
        })
    }

}
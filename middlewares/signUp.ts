import { NextFunction, Request, Response } from "express";
import { userAccount } from "../lib/data";
import bcrypt from "bcrypt";
import { accounts } from "../lib/data";
import { logger } from "../lib/logger";
import { log } from "node:console";

export async function signUp(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const body = req.body as userAccount;
    if (body === undefined) {
        logger.error("Sign up: !username and !password");
        res.status(400).json({
            success: false,
            message: "Cannot access to username and password"
        }) 
    }

    if (body.userName == "" || body.userName === undefined) {
        logger.error("Sign up: !username");
        res.status(400).json({
            success: false,
            message: "Cannot access to username"
        });
    }
    else if (body.userName != "" && body.userName !== undefined) {
        if (accounts.find(user => user.userName === body.userName) != null) {
            logger.error("Sign up: username already exist");
            return res.status(400).json({
                success: false,
                message: "Username already exist"
            });
        }
    }

    if (body.password == "" || body.password === undefined) {
        logger.error("Sign up: !password");
            res.status(400).json({
            success: false,
            message: "Cannot access to password"
        });
    }

    try {
        logger.info("Sign up successfully");
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
        body.userID = accounts.length + 1;
        
        accounts.push(body);
        res.status(201).json(body);
    }
    catch {
        res.status(500).json();
    }
}
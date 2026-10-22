import { NextFunction, Request, Response } from "express";
import { userAccount } from "../lib/data";
import bcrypt from "bcrypt";
import { accounts } from "../lib/data";
import { logger } from "../../bloggingAPI/lib/logger";
import { log } from "node:console";
import  jwt  from "jsonwebtoken";
import { env } from "../config/env";


export async function logIn(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const rawBody = req.body as userAccount;
    const isExistUser = accounts.find(user => user.userName === rawBody.userName);
     
    if (rawBody === undefined) {
        logger.error("Log in: !username and !password");
        return res.status(400).json({
            success: false,
            message: "!username and !password"
        });
    }

    if (rawBody.userName == "" || rawBody.userName === undefined) {
        logger.error("Log in: !username");
        return res.status(400).json({
            success: false,
            message: "!username"
        });
    }

    if (rawBody.password == "" || rawBody.password === undefined) {
        logger.error("Log in: !password");
        return res.status(400).json({
            success: false,
            message: "!password"
        });
    }

    if (isExistUser === null || isExistUser === undefined) {
        logger.error("Log in: username does not exist");
        return res.status(400).json({
            success: false,
            message: "Cannot find username"
        });
    }

    try {
        if (await bcrypt.compare(rawBody.password, isExistUser.password)) {
            logger.info("Log in successfully");

            const accessToken = jwt.sign({userName: isExistUser.userName, role: "user", id: isExistUser.userID}, env.accessSecretToken);
            const refreshToken = jwt.sign({userName: isExistUser.userName, role: "user", id: isExistUser.userID}, env.refreshSecretToken);

            if (accessToken) {
                return res.status(201).json({
                    success: true,
                    username: isExistUser.userName,
                    role: "user",
                    accessToken: accessToken,
                    id: isExistUser.userID
                });
            }    
        }
        else {
            logger.error("Log in: wrong password");
            return res.status(400).json({
                success: false,
                message: "Wrong password"
            });
        }
    }  
    catch {
        res.status(500).json();
    }


    
}
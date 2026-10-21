import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";
import jwt from "jsonwebtoken"
import { env } from "../config/env";


export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const headers = req.headers["authorization"];
    const token = headers ? headers.split(" ")[1] : undefined;

    if (token) {
        jwt.verify(token, env.accessSecretToken, (err, payload) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Found error while verifying"
                })
            }
            else {
                req.body.payload = payload;
                next();
            }
        })
    }   
    else res.status(401).json({
        success: false,
        message: "Token is null or undefined"
    });

}
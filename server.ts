import express, { NextFunction, Request, Response } from "express";
import { env } from "./config/env";
import { notFound } from "../bloggingAPI/middlewares/notFound";
import { errHandler } from "../bloggingAPI/middlewares/errHandler";
import { signUp } from "./middlewares/signUp";
import { logIn } from "./middlewares/logIn";
import jwt from "jsonwebtoken"
import { addExpense } from "./middlewares/addExpense";
import { authenticateToken } from "./middlewares/authenticateToken";
import { removeExpense } from "./middlewares/removeExpense";
import { updateExpense } from "./middlewares/updateExpense";
import { listExpense } from "./middlewares/listExpense";
import { startApp } from "./middlewares/startApp";
import { logger } from "./lib/logger";
import { expenseCategories } from "./lib/data";


const app = express();

app.use(express.json());

const createApp = () => {
    app.get("/", startApp);
    app.get("/expense/list-all", (req: Request, res: Response, next: NextFunction) => {
        logger.info("Access to list-all success");
        res.status(200).json(expenseCategories);
    })
    app.post("/signup", signUp);
    app.post("/login", logIn);
    app.post("/expense/add", authenticateToken, addExpense);
    app.post("/expense/delete", authenticateToken, removeExpense);
    app.post("/expense/update", authenticateToken, updateExpense);
    app.post("/expense/list", authenticateToken, listExpense);


    app.use(notFound);
    app.use(errHandler);
}


createApp();

app.listen(env.port, () => {
    console.log("App is running");
});

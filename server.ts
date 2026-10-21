import express from "express";
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


const app = express();

app.use(express.json());

const createApp = () => {
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

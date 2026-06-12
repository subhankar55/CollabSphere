import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "../Backend/routes/auth.routes.js";
import workspaceRouter from "../Backend/routes/workspace.route.js";





const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


app.use(express.json({limit:"1mb",extended:true}));
app.use(express.urlencoded({limit:"1mb",extended:true}));

app.use(cookieParser());


app.use("/collabsphere/api/v1/auth",authRouter);
app.use("/collabsphere/api/v1/workspace",workspaceRouter);








export default app;
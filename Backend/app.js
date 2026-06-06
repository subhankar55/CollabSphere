import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "../Backend/routes/auth.routes.js";




const app = express();

app.use(cors({
    origin:"*",
    credentials:true
}));


app.use(express.json({limit:"1mb",extended:true}));
app.use(express.urlencoded({limit:"1mb",extended:true}));

app.use(cookieParser());


app.use("/collabsphere/api/v1/auth",authRouter);








export default app;
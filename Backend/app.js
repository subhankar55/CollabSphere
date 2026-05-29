import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();

app.use(cors({
    origin:"*",
    credentials:true
}));


app.use(express.json({limit:"1mb",extended:true}));
app.use(express.urlencoded({limit:"1mb",extended:true}));

app.use(cookieParser());


export default app;
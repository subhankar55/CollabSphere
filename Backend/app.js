import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import workspaceRouter from "./routes/workspace.routes.js";
import taskRouter from "./routes/task.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import chatRouter from "./routes/chat.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js"


// This is an express app



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
app.use("/collabsphere/api/v1/task",taskRouter);
app.use("/collabsphere/api/v1/notification",notificationRouter);
app.use("/collabsphere/api/v1/chat",chatRouter);
app.use("/collabsphere/api/v1/dashboard",dashboardRouter);






export default app;
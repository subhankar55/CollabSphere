import { Router } from "express";
import {
    numberOfWorkspaces,
    activeProjects,
    createdWorkspaces,
    activeTasks,
    completedTasks
} from "../controller/dashboard/dashboard.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js";



const router = Router();
router.route("/workspaces").get(verifyJWT,numberOfWorkspaces);
router.route("/createdWorkspaces").get(verifyJWT,createdWorkspaces);
router.route("/projects").get(verifyJWT,activeProjects);
router.route("/tasks").get(verifyJWT,activeTasks);
router.route("/completedTasks").get(verifyJWT,completedTasks);




export default router;
import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {    
        createTask,
        updateTask,
        getTaskbyId,
        allTasks,
        updateToReview,
        updateToCompleted,
        deleteTask
} from "../controller/task/task.controller.js";




const router = Router();


router.route("/createTask/:projectid").post(verifyJWT,createTask);
router.route("/updateTask/:taskid").patch(verifyJWT,updateTask);
router.route("/getTask/:taskid").get(verifyJWT,getTaskbyId);
router.route("/allTasks/:projectid").get(verifyJWT,allTasks);
router.route("/updateToReview/:taskid").patch(verifyJWT,updateToReview);
router.route("/updateToCompleted/:taskid").patch(verifyJWT,updateToCompleted);
router.route("/deleteTask/:taskid").delete(verifyJWT,deleteTask);







export default router;
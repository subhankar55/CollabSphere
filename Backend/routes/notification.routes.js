import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getAllNotifications, getUnreadCount } from "../controller/notification/notification.controller.js";



const router = Router();

router.route("/getall").get(verifyJWT,getAllNotifications);
router.route("/unreads").get(verifyJWT,getUnreadCount);




export default router;
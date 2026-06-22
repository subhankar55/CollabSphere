import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createChat, getAllChats,

 } from "../controller/chat/chat.controller.js";


const router = Router();


router.route("/createChat").post(verifyJWT,createChat);
router.route("/allChats/:workspaceid").get(getAllChats);





export default router;


import {Router} from "express";
import { registerUser,
        loginUser,
        logoutUser, 
        getUser,
        updatePassword,
        deleteUser,
        refreshAccessToken
    
} from "../controller/authentication/auth.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";



const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(verifyJWT,logoutUser);
router.route("/user").get(verifyJWT,getUser);
router.route("/updatePassword").patch(verifyJWT,updatePassword);
router.route("/forgetPassword").patch(updatePassword);
router.route("/delete").delete(verifyJWT,deleteUser);
router.route("/refresh").get(refreshAccessToken);





export default router;

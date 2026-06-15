import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    createWorkspace,
    joinWorkspace,
    getWorkspaceById,
    getAllWorkspaces,
    getAllWorkspaceUsers,
    upgradeMember,
    downgradeMember,
    deleteWorkspace,
    getWorkspaceByName

 } from "../controller/workspace/workspace.controller.js";
import {
    createProject,
    deleteProject,
    getProjectById,
    getAllProjects

} from "../controller/workspace/project.controller.js";

import {
    inviteUser,
    getInvitations

} from "../controller/workspace/invitation.controller.js";



const router = Router();

router.route("/create").post(verifyJWT,createWorkspace);
router.route("/join/:workspaceid").get(verifyJWT,joinWorkspace);
router.route("/allworkspaces").get(verifyJWT,getAllWorkspaces);
router.route("/getWorkspace").post(verifyJWT,getWorkspaceByName);
router.route("/invitations").get(verifyJWT,getInvitations);

router.route("/:workspaceid").get(verifyJWT,getWorkspaceById);
router.route("/:workspaceid/users").get(verifyJWT,getAllWorkspaceUsers);
router.route("/:workspaceid/users/:userid/upgrade").patch(verifyJWT,upgradeMember);
router.route("/:workspaceid/users/:userid/downgrade").patch(verifyJWT,downgradeMember);
router.route("/:workspaceid/delete").delete(verifyJWT,deleteWorkspace);
router.route("/:workspaceid/project/create").post(verifyJWT,createProject);
router.route("/:workspaceid/project/:projectid/delete").delete(verifyJWT,deleteProject);
router.route("/:workspaceid/project/:projectid").get(verifyJWT,getProjectById);
router.route("/:workspaceid/projects").get(verifyJWT,getAllProjects);
router.route("/:workspaceid/invite").post(verifyJWT,inviteUser);




export default router;
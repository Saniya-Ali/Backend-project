import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middleware.js'

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount:1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),//Put the middleware above the main function to be executed, bcz jao to mujhse milkr jana concept
    registerUser
)
// http://localhost:8000/api/v1/users/register
// router.route("/login").post(login)
// http://localhost:8000/api/v1/users/login

export default router
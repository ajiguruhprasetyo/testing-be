import express from "express";
import {
    registerUser,
    loginUser,
    profileUser,
    logout,
    logoutAll
} from "../../controllers/user/index.js";
import auth from "../../middleware/jwt.js";

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, profileUser);
router.post('/logout', auth, logout);
router.post('/logout-all', auth, logoutAll);

export default router;
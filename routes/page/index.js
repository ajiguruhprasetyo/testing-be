import express from "express";
import {About, Home, Profile} from "../../controllers/home.js";

const router = express.Router();

router.get('/', Home);
router.get('/about', About);
router.get('/profile', Profile);

export default router;
import express from "express";
//import route module
import products from "./product/index.js";
import pages from "./page/index.js";
import users from "./user/index.js";

const router = express.Router();

router.use('/', pages)
router.use('/products', products)
router.use('/users', users)

export default router;
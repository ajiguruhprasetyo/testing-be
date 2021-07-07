import express from "express";

import {
    deleteProduct,
    getProductById,
    getProducts,
    saveProduct,
    updateProduct
} from "../../controllers/product/index.js";

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', saveProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
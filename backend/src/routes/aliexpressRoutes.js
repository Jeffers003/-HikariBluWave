import express from "express";

import { importarProduto } from "../controllers/aliexpressController.js";

const router = express.Router();

router.post("/importar", importarProduto);

export default router;

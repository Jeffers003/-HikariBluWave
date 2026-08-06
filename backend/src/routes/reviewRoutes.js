import express from "express";

import {
  listarReviews,
  listarReviewsPublicos,
  buscarReview,
  criarReview,
  atualizarReview,
  excluirReview,
} from "../controllers/reviewController.js";

import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", listarReviews);

router.get("/publicos", listarReviewsPublicos);

router.get("/:id", buscarReview);

router.post("/", upload.single("avatar"), criarReview);

router.put("/:id", upload.single("avatar"), atualizarReview);

router.delete("/:id", excluirReview);

export default router;

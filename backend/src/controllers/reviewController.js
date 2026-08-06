import fs from "fs";
import Review from "../models/Review.js";

export const listarReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({
      ordem: 1,
      createdAt: -1,
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao listar reviews.",
      erro: error.message,
    });
  }
};

export const listarReviewsPublicos = async (req, res) => {
  try {
    const reviews = await Review.find({ ativo: true }).sort({
      ordem: 1,
      createdAt: -1,
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao listar reviews.",
      erro: error.message,
    });
  }
};

export const buscarReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        mensagem: "Review não encontrado.",
      });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar review.",
      erro: error.message,
    });
  }
};

export const criarReview = async (req, res) => {
  try {
    const review = new Review({
      nome: req.body.nome,
      cargo: req.body.cargo,
      comentario: req.body.comentario,
      nota: req.body.nota,
      ativo: req.body.ativo,
      destaque: req.body.destaque,
      ordem: req.body.ordem,
      avatar: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao criar review.",
      erro: error.message,
    });
  }
};

export const atualizarReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        mensagem: "Review não encontrado.",
      });
    }

    if (req.file) {
      if (review.avatar) {
        const caminho = `.${review.avatar}`;

        if (fs.existsSync(caminho)) {
          fs.unlinkSync(caminho);
        }
      }

      review.avatar = `/uploads/${req.file.filename}`;
    }

    review.nome = req.body.nome;
    review.cargo = req.body.cargo;
    review.comentario = req.body.comentario;
    review.nota = req.body.nota;
    review.ativo = req.body.ativo;
    review.destaque = req.body.destaque;
    review.ordem = req.body.ordem;

    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao atualizar review.",
      erro: error.message,
    });
  }
};

export const excluirReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        mensagem: "Review não encontrado.",
      });
    }

    if (review.avatar) {
      const caminho = `.${review.avatar}`;

      if (fs.existsSync(caminho)) {
        fs.unlinkSync(caminho);
      }
    }

    await review.deleteOne();

    res.json({
      mensagem: "Review removido com sucesso.",
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao excluir review.",
      erro: error.message,
    });
  }
};

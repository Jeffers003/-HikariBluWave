import { body, validationResult } from "express-validator";

export const validarProduto = [
  body("nome")
    .trim()
    .notEmpty()
    .withMessage("O nome é obrigatório.")
    .isLength({ min: 3 })
    .withMessage("O nome deve ter pelo menos 3 caracteres."),

  body("descricao").trim().notEmpty().withMessage("A descrição é obrigatória."),

  body("preco")
    .notEmpty()
    .withMessage("O preço é obrigatório.")
    .isFloat({ gt: 0 })
    .withMessage("O preço deve ser maior que zero."),

  body("categoria")
    .notEmpty()
    .withMessage("A categoria é obrigatória.")
    .isMongoId()
    .withMessage("Categoria inválida."),

  body("estoque")
    .notEmpty()
    .withMessage("O estoque é obrigatório.")
    .isInt({ min: 0 })
    .withMessage("O estoque deve ser um número maior ou igual a zero."),

  body("ativo")
    .optional()
    .isBoolean()
    .withMessage("O campo ativo deve ser verdadeiro ou falso."),

  (req, res, next) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.status(400).json({
        errors: erros.array(),
      });
    }

    next();
  },
];

export const admin = (req, res, next) => {
  if (req.usuario.cargo !== "admin") {
    return res.status(403).json({
      error: "Acesso negado.",
    });
  }

  next();
};

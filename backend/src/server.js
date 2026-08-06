import pedidoRoutes from "./routes/pedidoRoutes.js";
import connectDB from "./config/database.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import express from "express";
import dotenv from "dotenv";
import vendaRoutes from "./routes/vendaRoutes.js";
import produtoRoutes from "./routes/produtoRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";
import cors from "cors";
import achadinhoRoutes from "./routes/achadinhoRoutes.js";
import colecaoRoutes from "./routes/colecaoRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import aliexpressRoutes from "./routes/aliexpressRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Banco
connectDB();

// Rota teste
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "API HikariBluWave funcionando 🚀",
  });
});

// Rotas
app.use("/usuarios", usuarioRoutes);

app.use("/vendas", vendaRoutes);

app.use("/produtos", produtoRoutes);

app.use("/categorias", categoriaRoutes);

app.use("/pedidos", pedidoRoutes);

app.use("/dashboard", dashboardRoutes);

app.use("/achadinhos", achadinhoRoutes);

app.use("/colecoes", colecaoRoutes);

app.use("/reviews", reviewRoutes);

app.use("/aliexpress", aliexpressRoutes);
// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// SEMPRE POR ÚLTIMO
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

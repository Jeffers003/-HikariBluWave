import axios from "axios";
import qs from "qs";
import { chamarAliExpress } from "./aliexpressClient.js";
import { gerarAssinatura } from "../utils/aliexpressSign.js";

export async function buscarCategoriasAliExpress() {
  return await chamarAliExpress("aliexpress.ds.category.get");
}
export async function importarCategoriasAliExpress() {
  const resposta = await buscarCategoriasAliExpress();

  const categorias =
    resposta.aliexpress_ds_category_get_response.resp_result.result.categories
      .category;

  return categorias.map((categoria) => ({
    nome: categoria.category_name,

    slug: categoria.category_name.toLowerCase().replace(/\s+/g, "-"),

    descricao: "Categoria importada do AliExpress",

    ativo: true,

    origem: "AliExpress",

    externalId: categoria.category_id,
  }));
}

export async function buscarProdutoAliExpress(url) {
  return {
    sucesso: true,
    mensagem: "Produto recebido",
    url,
  };
}

export async function buscarProdutosAliExpress(keyword) {
  return await chamarAliExpress("aliexpress.ds.product.get", {
    keywords: keyword,
    page_no: 1,
    page_size: 20,
  });
}

export async function gerarAccessToken(code) {
  const params = {
    app_key: process.env.ALIEXPRESS_APP_KEY,
    code,
    timestamp: Date.now(),
    sign_method: "sha256",
  };

  params.sign = gerarAssinatura(params, process.env.ALIEXPRESS_APP_SECRET);
  console.log("PARAMS ENVIADOS ALIEXPRESS:");
  console.log(params);

  console.log("STRING SIGN:");
  console.log(
    process.env.ALIEXPRESS_APP_SECRET +
      Object.keys(params)
        .sort()
        .map((key) => key + params[key])
        .join("") +
      process.env.ALIEXPRESS_APP_SECRET,
  );

  console.log("SIGN:");
  console.log(params.sign);
  const resposta = await axios.post(
    "https://api-sg.aliexpress.com/rest/auth/token/create",
    qs.stringify(params),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  return resposta.data;
}

import axios from "axios";
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
    sign_method: "md5",
  };

  params.sign = gerarAssinatura(params, process.env.ALIEXPRESS_APP_SECRET);

  const resposta = await axios.post(
    "https://api-sg.aliexpress.com/rest/auth/token/create",
    null,
    {
      params,
    },
  );

  return resposta.data;
}

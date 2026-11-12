import { supabase } from "./supabase";

async function testarConexao() {
  const { data, error } = await supabase.from("produtos").select("*");

  if (error) {
    console.error("Erro na conexão:", error.message);
    return;
  }

  console.log("Conexão realizada com sucesso!");
  console.log("Produtos cadastrados:", data);
}

testarConexao();

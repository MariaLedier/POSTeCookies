import express from "express";
import path from "path";

const host = "0.0.0.0";
const porta = 3000;

let listaEmpresas = [];

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

function cadastrarEmpresa(requisicao, resposta) {
  const {
    cnpj,
    razao_social,
    nome_fantasia,
    endereco,
    cidade,
    uf,
    cep,
    email,
    telefone,
  } = requisicao.body;

  let errors = [];

  if (!cnpj) errors.push("CNPJ é obrigatório.");
  if (!razao_social) errors.push("Razão Social é obrigatória.");
  if (!nome_fantasia) errors.push("Nome Fantasia é obrigatório.");
  if (!endereco) errors.push("Endereço é obrigatório.");
  if (!cidade) errors.push("Cidade é obrigatória.");
  if (!uf) errors.push("UF é obrigatório.");
  if (!cep) errors.push("CEP é obrigatório.");
  if (!email) errors.push("Email é obrigatório.");
  if (!telefone) errors.push("Telefone é obrigatório.");

  if (errors.length > 0) {
    resposta.status(400).send({ success: false, errors: errors });
  } else {
    listaEmpresas.push({
      cnpj,
      razao_social,
      nome_fantasia,
      endereco,
      cidade,
      uf,
      cep,
      email,
      telefone,
    });
    resposta.redirect("/listarEmpresas");
  }
}

app.post("/cadastrarEmpresa", cadastrarEmpresa);

app.get("/listarEmpresas", (req, resp) => {
  resp.write("<html>");
  resp.write("<head>");
  resp.write("<title>Lista de Empresas</title>");
  resp.write('<meta charset="utf-8">');
  resp.write(
    '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">'
  );
  resp.write("</head>");
  resp.write("<body>");
  resp.write("<h1>Lista de Empresas</h1>");
  resp.write('<table class="table table-striped">');
  resp.write("<tr>");
  resp.write("<th>CNPJ</th>");
  resp.write("<th>Razão Social</th>");
  resp.write("<th>Nome Fantasia</th>");
  resp.write("<th>Endereço</th>");
  resp.write("<th>Cidade</th>");
  resp.write("<th>UF</th>");
  resp.write("<th>CEP</th>");
  resp.write("<th>Email</th>");
  resp.write("<th>Telefone</th>");
  resp.write("</tr>");
  for (let i = 0; i < listaEmpresas.length; i++) {
    resp.write("<tr>");
    resp.write(`<td>${listaEmpresas[i].cnpj}`);
    resp.write(`<td>${listaEmpresas[i].razao_social}`);
    resp.write(`<td>${listaEmpresas[i].nome_fantasia}`);
    resp.write(`<td>${listaEmpresas[i].endereco}`);
    resp.write(`<td>${listaEmpresas[i].cidade}`);
    resp.write(`<td>${listaEmpresas[i].uf}`);
    resp.write(`<td>${listaEmpresas[i].cep}`);
    resp.write(`<td>${listaEmpresas[i].email}`);
    resp.write(`<td>${listaEmpresas[i].telefone}`);
    resp.write("</tr>");
  }
  resp.write("</table>");
  resp.write('<a href="/">Voltar</a>');
  resp.write("</body>");
  resp.write(
    '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>'
  );
  resp.write("</html>");
  resp.end();
});

app.listen(porta, host, () => {
  console.log(`Servidor rodando em http://${host}:${porta}`);
});

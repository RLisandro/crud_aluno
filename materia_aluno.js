const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let alunos = [];
let proximoId = 1;
const materias_disponiveis = [

  "História",
  "Geografia",
  "Ciências"
];

//  Validação  se as materias existem
function validar_materias(materiasSelecionados) {
  return materiasSelecionados.every((materia) => materias_disponiveis.includes(materia));
}

// Verificação  se o aluno já existe
function alunoExiste(id) {
  return alunos.some((aluno) => aluno.id === parseInt(id));
}

// Rotas CRUD

//Lista de alunos cadastrados e materias disponíveis.
app.get("/", (req, res) => {
  res.json({
    message: "Lista de alunos cadastrados e materias disponíveis.",
    alunos: alunos.map((aluno) => ({
      nome: aluno.nome,
      materias: aluno.materias
    })),
    materias_disponiveis
  });
});
// Obter um aluno por ID
app.get("/alunos/:id", (req, res) => {
  const aluno = alunos.find((aluno) => aluno.id === parseInt(req.params.id));
  if (aluno) {
    res.json(aluno);
  } else {
    res.status(404).send({ message: "Aluno(a) não encontrado" });
  }
});

// Adicionar um novo aluno
app.post("/alunos", (req, res) => {
  const { nome, materias } = req.body;

  if (
    !nome ||
    !Array.isArray(materias) ||
    materias.length === 0 ||
    materias.length > 3
  ) {
    return res.status(400).send({
      message:
        "Nome é obrigatório e o(a) aluno(a) deve escolher de 1 a 3 materias."
    });
  }

  if (!validar_materias(materias)) {
    return res
      .status(400)
      .send({ message: "Um ou mais materias selecionados são inválidos." });
  }

  const novoAluno = {
    id: proximoId++,
    nome,
    materias
  };
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

// Atualizar um aluno existente
app.put("/alunos/:id", (req, res) => {
  const alunoId = parseInt(req.params.id);
  const { nome, materias } = req.body;
  const alunoIndex = alunos.findIndex((aluno) => aluno.id === alunoId);

  if (!alunoExiste(alunoId)) {
    return res.status(404).send({ message: "Aluno(a) não encontrado" });
  }

  if (
    !nome ||
    !Array.isArray(materias) ||
    materias.length === 0 ||
    materias.length > 3
  ) {
    return res.status(400).send({
      message:
        "Nome é obrigatório e o(a) aluno(a) deve escolher de 1 a 3 materias."
    });
  }

  if (!validar_materias(materias)) {
    return res
      .status(400)
      .send({ message: "Um ou mais materias selecionados são inválidos." });
  }

  alunos[alunoIndex] = { id: alunoId, nome, materias };
  res.json(alunos[alunoIndex]);
});

// Excluir um aluno com retorno de mensagem de sucesso
app.delete("/alunos/:id", (req, res) => {
  const alunoId = parseInt(req.params.id);
  const alunoIndex = alunos.findIndex((aluno) => aluno.id === alunoId);

  if (!alunoExiste(alunoId)) {
    return res.status(404).send({ message: "Aluno(a) não encontrado" });
  }

  if (alunoIndex !== -1) {
    alunos.splice(alunoIndex, 1);
    res.status(200).send({ message: "Aluno(a) excluído(a) com sucesso." });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

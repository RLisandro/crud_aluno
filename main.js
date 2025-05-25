const express = require("express");

const app = express();
app.use(express.json());

let alunos = [];
let proximoId = 1;
const cursosDisponiveis = [
  "Matemática",
  "Português",
  "História",
  "Geografia",
  "Ciências",
  "Inglês"
];

function validarCursos(cursosSelecionados) {
  const cursosInvalidos = cursosSelecionados.filter(
    (curso) => !cursosDisponiveis.includes(curso)
  );
  return cursosInvalidos.length === 0 ? true : cursosInvalidos;
}

app.get("/", (req, res) => {
  console.log("Rota / acessada!");
  res.json({
    message: "Lista de alunos cadastrados .",
    alunos: alunos.map((aluno) => ({
      nome: aluno.nome,
      cursos: aluno.cursos
    })),
    messege: "Cursos disponíveis",
    cursosDisponiveis
  });
});

app.get("/alunos/:id", (req, res) => {
  const alunoIndex = alunos.findIndex(
    (aluno) => aluno.id === parseInt(req.params.id)
  );
  if (alunoIndex === -1) {
    return res.status(404).send({ message: "Aluno(a) não encontrado" });
  }
  res.json(alunos[alunoIndex]);
});

app.post("/alunos", (req, res) => {
  const { nome, cursos } = req.body;

  if (
    !nome ||
    !Array.isArray(cursos) ||
    cursos.length === 0 ||
    cursos.length > 3
  ) {
    return res.status(400).send({
      message:
        "Nome é obrigatório e o(a) aluno(a) deve escolher de 1 a 3 cursos."
    });
  }

  const cursosInvalidos = validarCursos(cursos);
  if (cursosInvalidos !== true) {
    return res.status(400).send({
      message: `Os seguintes cursos são inválidos: ${cursosInvalidos.join(
        ", "
      )}`
    });
  }

  const novoAluno = { id: proximoId++, nome, cursos };
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

app.put("/alunos/:id", (req, res) => {
  const alunoId = parseInt(req.params.id);
  const { nome, cursos } = req.body;
  const alunoIndex = alunos.findIndex((aluno) => aluno.id === alunoId);

  if (alunoIndex === -1) {
    return res.status(404).send({ message: "Aluno(a) não encontrado" });
  }

  if (
    !nome ||
    !Array.isArray(cursos) ||
    cursos.length === 0 ||
    cursos.length > 3
  ) {
    return res.status(400).send({
      message:
        "Nome é obrigatório e o(a) aluno(a) deve escolher de 1 a 3 cursos."
    });
  }

  const cursosInvalidos = validarCursos(cursos);
  if (cursosInvalidos !== true) {
    return res.status(400).send({
      message: `Os seguintes cursos são inválidos: ${cursosInvalidos.join(
        ", "
      )}`
    });
  }

  alunos[alunoIndex] = { id: alunoId, nome, cursos };
  res.json(alunos[alunoIndex]);
});

app.delete("/alunos/:id", (req, res) => {
  const alunoId = parseInt(req.params.id);
  const alunoIndex = alunos.findIndex((aluno) => aluno.id === alunoId);

  if (alunoIndex === -1) {
    return res.status(404).send({ message: "Aluno(a) não encontrado" });
  }

  alunos.splice(alunoIndex, 1);
  res.status(200).send({ message: "Aluno(a) excluído(a) com sucesso." });
});

const PORT = 3000; // Escolha a porta desejada

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { app, alunos, proximoId }; // Agora exportamos as variáveis corretamente

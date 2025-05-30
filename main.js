const express = require("express");
const {
  listarAlunos,
  buscarAlunoPorId,
  adicionarAluno,
  atualizarAluno,
  removerAluno
} = require("./aluno");

const { validarCursos, listarCursos } = require("./materia");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Lista de alunos cadastrados.",
    alunos: listarAlunos().map(aluno => ({
      nome: aluno.nome,
      cursos: aluno.cursos
    })),
    cursosDisponiveis: listarCursos()
  });
});

app.get("/alunos/:id", (req, res) => {
  const aluno = buscarAlunoPorId(parseInt(req.params.id));
  if (!aluno) {
    return res.status(404).send({ message: "Aluno(a) não encontrado" });
  }
  res.json(aluno);
});

app.post("/alunos", (req, res) => {
  const { nome, cursos } = req.body;

  if (!nome || !Array.isArray(cursos) || cursos.length < 1 || cursos.length > 3) {
    return res.status(400).send({
      message: "Nome é obrigatório e o(a) aluno(a) deve escolher de 1 a 3 cursos."
    });
  }

  const cursosInvalidos = validarCursos(cursos);
  if (cursosInvalidos !== true) {
    return res.status(400).send({
      message: `Cursos inválidos: ${cursosInvalidos.join(", ")}`
    });
  }

  const novoAluno = adicionarAluno(nome, cursos);
  res.status(201).json(novoAluno);
});

app.put("/alunos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, cursos } = req.body;

  if (!nome || !Array.isArray(cursos) || cursos.length < 1 || cursos.length > 3) {
    return res.status(400).send({
      message: "Nome é obrigatório e o(a) aluno(a) deve escolher de 1 a 3 cursos."
    });
  }

  const cursosInvalidos = validarCursos(cursos);
  if (cursosInvalidos !== true) {
    return res.status(400).send({
      message: `Cursos inválidos: ${cursosInvalidos.join(", ")}`
    });
  }

  const alunoAtualizado = atualizarAluno(id, nome, cursos);
  if (!alunoAtualizado) {
    return res.status(404).send({ message: "Aluno(a) não encontrado" });
  }

  res.json(alunoAtualizado);
});

app.delete("/alunos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!removerAluno(id)) {
    return res.status(404).send({ message: "Aluno(a) não encontrado" });
  }
  res.status(200).send({ message: "Aluno(a) excluído(a) com sucesso." });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const request = require("supertest");
const app = require("../materia_aluno");

app.post("/alunos", (req, res) => {
  const { nome, materias } = req.body;
  if (!nome || !Array.isArray(materias)) {
    return res.status(400).json({ error: "Nome e materias são obrigatórios" });
  }
  // lógica para criar um novo aluno
  const novoAluno = {
    id: Date.now(),
    nome,
    materias
  };
  // Supondo que você tenha um array alunos para armazenar
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

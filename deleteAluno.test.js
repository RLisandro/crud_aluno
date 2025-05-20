const request = require("supertest");
const app = require("../materia_aluno");
describe("DELETE /alunos/:id", () => {
  let alunoId;

  beforeAll(async () => {
    // Cria um aluno para deletar
    const res = await request(app)
      .post("/alunos")
      .send({ nome: "João", materias: ["Matemática"] });
    alunoId = res.body.id;
  });
  app.delete("/alunos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = alunos.findIndex((aluno) => aluno.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Aluno(a) não encontrado" });
    }
    alunos.splice(index, 1);
    res.status(200).json({ message: "Aluno(a) excluído(a) com sucesso." });
  });

  it("Deve retornar 404 ao tentar obter aluno inexistente", async () => {
    const res = await request(app).get(`/alunos/${alunoId}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Aluno(a) não encontrado");
  });
});

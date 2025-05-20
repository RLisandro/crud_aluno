const request = require("supertest");
const app = require("../materia_aluno");

describe("PUT /alunos/:id", () => {
  let alunoId;

  beforeAll(async () => {
    // Cria um aluno para atualizar
    const res = await request(app)
      .post("/alunos")
      .send({ nome: "Maria", materias: ["História"] });
    alunoId = res.body.id;
  });

  it("Deve atualizar um aluno existente", async () => {
    const res = await request(app)
      .put(`/alunos/${alunoId}`)
      .send({ nome: "Maria Silva", materias: ["Física"] });
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe("Maria Silva");
    expect(res.body.materias).toEqual(["Física"]);
  });
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});

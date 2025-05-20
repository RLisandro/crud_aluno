const request = require("supertest");
const app = require("../materia_aluno");

describe("GET /", () => {
  it("Deve retornar lista de alunos e matérias disponíveis", async () => {
    const res = await request(app).get("/");
    console.log(res.body); // Retorna o corpo da resposta para verificação no terminal
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("alunos");
    expect(res.body).toHaveProperty("materias_disponiveis");
  });
});

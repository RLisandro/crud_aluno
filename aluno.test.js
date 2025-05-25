const request = require("supertest");
const { app, alunos, proximoId } = require("../main");
// Importar o arquivo do servidor

describe("Testes da API de Alunos", () => {
  let currentId = 1; // Usar uma variável local para controlar o ID

  beforeEach(() => {
    // Resetar a lista de alunos e o ID antes de cada teste
    alunos.length = 0;
    currentId = 1;
  });

  it("GET / deve retornar a lista de alunos e cursos disponíveis", async () => {
    console.log("Iniciando teste GET /"); // Adicione este log
    try {
      const response = await request(app).get("/");
      console.log("Resposta recebida:", response.statusCode, response.body); // Adicione este log
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe(
        "Lista de alunos cadastrados ." // <--- CORREÇÃO AQUI
      );
      expect(Array.isArray(response.body.alunos)).toBe(true);
      expect(Array.isArray(response.body.cursosDisponiveis)).toBe(true);
      expect(response.body.cursosDisponiveis).toEqual([
        "Matemática",
        "Português",
        "História",
        "Geografia",
        "Ciências",
        "Inglês"
      ]);
      console.log("Teste GET / finalizado com sucesso (aparente)"); // Adicione este log
    } catch (error) {
      console.error("Erro no teste GET /:", error);
      throw error; // Re-lança o erro para o Jest reportar
    }
  });

  it("GET /alunos/:id deve retornar um aluno específico", async () => {
    const alunoTeste = {
      id: currentId++,
      nome: "João",
      cursos: ["Matemática"]
    };
    alunos.push(alunoTeste);
    const response = await request(app).get(`/alunos/${alunoTeste.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(alunoTeste);
  });

  it("GET /alunos/:id deve retornar 404 para um aluno não encontrado", async () => {
    const response = await request(app).get("/alunos/99");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Aluno(a) não encontrado" });
  });

  it("POST /alunos deve adicionar um novo aluno", async () => {
    const novoAluno = { nome: "Maria", cursos: ["Português", "Inglês"] };
    const response = await request(app)
      .post("/alunos")
      .send(novoAluno)
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe(novoAluno.nome);
    expect(response.body.cursos).toEqual(novoAluno.cursos);
    expect(alunos.length).toBe(1);
    expect(alunos[0]).toEqual({ id: 1, ...novoAluno });
    // Não precisamos incrementar proximoId aqui, pois o beforeEach já o reseta
  });

  it("POST /alunos deve retornar 400 para dados inválidos (sem nome)", async () => {
    const response = await request(app)
      .post("/alunos")
      .send({ cursos: ["Matemática"] })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message:
        "Nome é obrigatório e o(a) aluno(a) deve escolher de 1 a 3 cursos."
    });
    expect(alunos.length).toBe(0);
  });

  it("POST /alunos deve retornar 400 para dados inválidos (mais de 3 cursos)", async () => {
    const response = await request(app)
      .post("/alunos")
      .send({
        nome: "Carlos",
        cursos: ["Matemática", "Português", "História", "Geografia"]
      })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message:
        "Nome é obrigatório e o(a) aluno(a) deve escolher de 1 a 3 cursos."
    });
    expect(alunos.length).toBe(0);
  });

  it("POST /alunos deve retornar 400 para curso inválido", async () => {
    const response = await request(app)
      .post("/alunos")
      .send({ nome: "Ana", cursos: ["Física"] })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Os seguintes cursos são inválidos: Física" // Correção aqui
    });
    expect(alunos.length).toBe(0);
  });

  it("PUT /alunos/:id deve atualizar um aluno existente", async () => {
    const alunoOriginal = {
      id: currentId++,
      nome: "Pedro",
      cursos: ["Ciências"]
    };
    alunos.push(alunoOriginal);
    const alunoAtualizado = {
      nome: "Pedro Henrique",
      cursos: ["Inglês", "História"]
    };
    const response = await request(app)
      .put(`/alunos/${alunoOriginal.id}`)
      .send(alunoAtualizado)
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: alunoOriginal.id, ...alunoAtualizado });
    expect(alunos.length).toBe(1);
    expect(alunos[0]).toEqual({ id: alunoOriginal.id, ...alunoAtualizado });
  });

  it("PUT /alunos/:id deve retornar 404 para aluno não encontrado", async () => {
    const response = await request(app)
      .put("/alunos/99")
      .send({ nome: "Teste", cursos: ["Matemática"] })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Aluno(a) não encontrado" });
  });

  it("PUT /alunos/:id deve retornar 400 para dados inválidos (sem nome)", async () => {
    const alunoOriginal = {
      id: currentId++,
      nome: "Carla",
      cursos: ["Geografia"]
    };
    alunos.push(alunoOriginal);
    const response = await request(app)
      .put(`/alunos/${alunoOriginal.id}`)
      .send({ cursos: ["Química"] })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message:
        "Nome é obrigatório e o(a) aluno(a) deve escolher de 1 a 3 cursos."
    });
  });

  it("PUT /alunos/:id deve retornar 400 para dados inválidos (mais de 3 cursos)", async () => {
    const alunoOriginal = {
      id: currentId++,
      nome: "Carla",
      cursos: ["Geografia"]
    };
    alunos.push(alunoOriginal);
    const response = await request(app)
      .put(`/alunos/${alunoOriginal.id}`)
      .send({
        nome: "Carla",
        cursos: ["Química", "Física", "Biologia", "Artes"]
      })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message:
        "Nome é obrigatório e o(a) aluno(a) deve escolher de 1 a 3 cursos."
    });
  });

  it("PUT /alunos/:id deve retornar 400 para curso inválido", async () => {
    const alunoOriginal = {
      id: currentId++,
      nome: "Carla",
      cursos: ["Geografia"]
    };
    alunos.push(alunoOriginal);
    const response = await request(app)
      .put(`/alunos/${alunoOriginal.id}`)
      .send({ nome: "Carla", cursos: ["Astronomia"] })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Os seguintes cursos são inválidos: Astronomia" // Correção aqui
    });
  });
  it("DELETE /alunos/:id deve excluir um aluno existente", async () => {
    const alunoParaExcluir = {
      id: currentId++,
      nome: "Mariana",
      cursos: ["Português"]
    };
    alunos.push(alunoParaExcluir);
    const response = await request(app).delete(
      `/alunos/${alunoParaExcluir.id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Aluno(a) excluído(a) com sucesso."
    });
    expect(alunos.length).toBe(0);
  });

  it("DELETE /alunos/:id deve retornar 404 para aluno não encontrado", async () => {
    const response = await request(app).delete("/alunos/99");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Aluno(a) não encontrado" });
  });
});

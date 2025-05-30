const {
  listarAlunos,
  buscarAlunoPorId,
  adicionarAluno,
  atualizarAluno,
  removerAluno
} = require("../aluno");

beforeEach(() => {
  // Resetando os dados antes de cada teste
  while (listarAlunos().length > 0) {
    removerAluno(listarAlunos()[0].id);
  }
});

test("Deve adicionar um aluno com cursos válidos", () => {
  const aluno = adicionarAluno("Ana", ["Matemática", "Português"]);
  expect(aluno.nome).toBe("Ana");
  expect(aluno.cursos).toContain("Matemática");
  expect(aluno.id).toBeDefined();
});

test("Deve buscar um aluno por ID", () => {
  const aluno = adicionarAluno("Carlos", ["História"]);
  const resultado = buscarAlunoPorId(aluno.id);
  expect(resultado.nome).toBe("Carlos");
});

test("Deve atualizar os dados de um aluno", () => {
  const aluno = adicionarAluno("João", ["Geografia"]);
  const atualizado = atualizarAluno(aluno.id, "João Silva", ["Ciências"]);
  expect(atualizado.nome).toBe("João Silva");
  expect(atualizado.cursos).toContain("Ciências");
});

test("Deve remover um aluno existente", () => {
  const aluno = adicionarAluno("Laura", ["Inglês"]);
  const resultado = removerAluno(aluno.id);
  expect(resultado).toBe(true);
  expect(buscarAlunoPorId(aluno.id)).toBeUndefined();
});

test("Não deve atualizar aluno inexistente", () => {
  const resultado = atualizarAluno(999, "Fake", ["Matemática"]);
  expect(resultado).toBeNull();
});

test("Não deve remover aluno inexistente", () => {
  const resultado = removerAluno(999);
  expect(resultado).toBe(false);
});

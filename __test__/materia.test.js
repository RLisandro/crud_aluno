const { validarCursos, listarCursos } = require("../materia");

test("Deve retornar todos os cursos disponíveis", () => {
  const cursos = listarCursos();
  expect(cursos).toContain("Matemática");
  expect(cursos.length).toBeGreaterThan(0);
});

test("Deve validar cursos corretamente", () => {
  const resultado = validarCursos(["História", "Português"]);
  expect(resultado).toBe(true);
});

test("Deve identificar cursos inválidos", () => {
  const resultado = validarCursos(["Física", "Matemática"]);
  expect(resultado).toEqual(["Física"]);
});

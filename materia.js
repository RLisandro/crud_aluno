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
    curso => !cursosDisponiveis.includes(curso)
  );
  return cursosInvalidos.length === 0 ? true : cursosInvalidos;
}

function listarCursos() {
  return cursosDisponiveis;
}

module.exports = { validarCursos, listarCursos };

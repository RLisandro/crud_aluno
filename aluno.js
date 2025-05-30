let alunos = [];
let proximoId = 1;

function listarAlunos() {
  return alunos;
}

function buscarAlunoPorId(id) {
  return alunos.find(aluno => aluno.id === id);
}

function adicionarAluno(nome, cursos) {
  const novoAluno = { id: proximoId++, nome, cursos };
  alunos.push(novoAluno);
  return novoAluno;
}

function atualizarAluno(id, nome, cursos) {
  const index = alunos.findIndex(aluno => aluno.id === id);
  if (index === -1) return null;
  alunos[index] = { id, nome, cursos };
  return alunos[index];
}

function removerAluno(id) {
  const index = alunos.findIndex(aluno => aluno.id === id);
  if (index === -1) return false;
  alunos.splice(index, 1);
  return true;
}

module.exports = {
  listarAlunos,
  buscarAlunoPorId,
  adicionarAluno,
  atualizarAluno,
  removerAluno
};

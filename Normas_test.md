Antes de começar:

Instale o Thunder Client: Se ainda não o fez, instale a extensão "Thunder Client" no seu VS Code.
Execute sua Aplicação: Certifique-se de que sua aplicação Node.js está rodando. Pelo seu main.js, você pode iniciá-la com o comando node main.js no terminal, na pasta do projeto. Ela estará rodando em http://localhost:3000.
Como testar cada endpoint:

No Thunder Client, você criará novas requisições para cada endpoint.

1. Listar Alunos Cadastrados e Cursos Disponíveis

Método: GET
URL: http://localhost:3000/
Aba "Body": Não é necessário, pois é uma requisição GET.
Como fazer no Thunder Client:
Clique em "New Request".
Selecione o método GET.
Insira a URL http://localhost:3000/.
Clique em "Send".
Resposta Esperada (Exemplo):
json
{
"message": "Lista de alunos cadastrados.",
"alunos": [
// Lista de alunos, se houver algum cadastrado
// Ex: { "nome": "Ana", "cursos": ["Matemática", "Português"] }
],
"cursosDisponiveis": [
"Matemática",
"Português",
"História",
"Geografia",
"Ciências",
"Inglês"
]
} 2. Adicionar um Novo Aluno

Método: POST
URL: http://localhost:3000/alunos
Aba "Headers":
Adicione um header: Content-Type com o valor application/json.
Aba "Body":
Selecione a opção JSON.
Insira os dados do aluno. Lembre-se que os cursos devem estar entre os disponíveis ("Matemática", "Português", "História", "Geografia", "Ciências", "Inglês") e o aluno deve ter de 1 a 3 cursos.
Exemplo de corpo da requisição:
json
{
"nome": "Carlos Silva",
"cursos": ["Matemática", "História"]
}
Como fazer no Thunder Client:
Clique em "New Request".
Selecione o método POST.
Insira a URL http://localhost:3000/alunos.
Vá para a aba "Headers" e adicione Content-Type : application/json.
Vá para a aba "Body", selecione JSON e cole o JSON acima.
Clique em "Send".
Resposta Esperada (Status 201 Created):
json
{
"id": 1, // O ID será gerado automaticamente
"nome": "Carlos Silva",
"cursos": ["Matemática", "História"]
}
Teste também casos de erro:
Sem nome: {"cursos": ["Matemática"]} (Deve retornar 400 Bad Request)
Muitos cursos: {"nome": "Maria", "cursos": ["Matemática", "Português", "História", "Geografia"]} (Deve retornar 400 Bad Request)
Curso inválido: {"nome": "Pedro", "cursos": ["Física"]} (Deve retornar 400 Bad Request com a mensagem Cursos inválidos: Física) 3. Buscar Aluno por ID

Método: GET
URL: http://localhost:3000/alunos/{id} (substitua {id} pelo ID de um aluno existente, por exemplo, 1 se você acabou de adicionar o Carlos).
Aba "Body": Não é necessário.
Como fazer no Thunder Client:
Clique em "New Request".
Selecione o método GET.
Insira a URL, por exemplo, http://localhost:3000/alunos/1.
Clique em "Send".
Resposta Esperada (se o aluno com ID 1 existir):
json
{
"id": 1,
"nome": "Carlos Silva",
"cursos": ["Matemática", "História"]
}
Teste também caso de erro:
ID inexistente: http://localhost:3000/alunos/999 (Deve retornar 404 Not Found com a mensagem Aluno(a) não encontrado). 4. Atualizar Aluno

Método: PUT
URL: http://localhost:3000/alunos/{id} (substitua {id} pelo ID do aluno que você quer atualizar).
Aba "Headers":
Adicione um header: Content-Type com o valor application/json.
Aba "Body":
Selecione a opção JSON.
Insira os novos dados do aluno.
Exemplo de corpo da requisição para atualizar o aluno com ID 1:
json
{
"nome": "Carlos Alberto Silva",
"cursos": ["Ciências", "Inglês"]
}
Como fazer no Thunder Client:
Clique em "New Request".
Selecione o método PUT.
Insira a URL, por exemplo, http://localhost:3000/alunos/1.
Vá para a aba "Headers" e adicione Content-Type : application/json.
Vá para a aba "Body", selecione JSON e cole o JSON acima.
Clique em "Send".
Resposta Esperada (se o aluno com ID 1 existir):
json
{
"id": 1,
"nome": "Carlos Alberto Silva",
"cursos": ["Ciências", "Inglês"]
}
Teste também casos de erro:
ID inexistente: Tente atualizar um aluno com ID 999 (Deve retornar 404 Not Found).
Dados inválidos (semelhante ao POST): Tente enviar dados sem nome ou com cursos inválidos (Deve retornar 400 Bad Request). 5. Remover Aluno

Método: DELETE
URL: http://localhost:3000/alunos/{id} (substitua {id} pelo ID do aluno que você quer remover).
Aba "Body": Não é necessário.
Como fazer no Thunder Client:
Clique em "New Request".
Selecione o método DELETE.
Insira a URL, por exemplo, http://localhost:3000/alunos/1.
Clique em "Send".
Resposta Esperada (Status 200 OK, se o aluno com ID 1 existir):
json
{
"message": "Aluno(a) excluído(a) com sucesso."
}
Teste também caso de erro:
ID inexistente: Tente remover um aluno com ID 999 (Deve retornar 404 Not Found).
Dicas Adicionais:

Coleções: No Thunder Client, você pode criar "Collections" para organizar suas requisições. Isso é útil para agrupar todos os testes da sua API de alunos.
Ambientes: Se você tiver diferentes ambientes (desenvolvimento, teste, produção), pode usar a funcionalidade de "Environments" do Thunder Client para gerenciar variáveis como a URL base.
Verifique os Status Codes: Além do corpo da resposta, sempre verifique o Status Code HTTP (200, 201, 400, 404, etc.) para garantir que a API está se comportando como esperado.
Seguindo esses passos, você conseguirá testar todas as funcionalidades da sua API de CRUD de alunos usando o Thunder Client! Se tiver mais alguma dúvida, é só perguntar.

Rate this answer:
Context Sources (5)

Lisandro
Coleções: No Thunder Client, você pode criar "Collections" para organizar suas requisições. Isso é útil para agrupar todos os testes da sua API de alunos. Como faço ?

Gemini
Com certeza! Usar coleções no Thunder Client é uma ótima maneira de manter seus testes de API organizados. É bem simples de fazer:

Passos para criar uma Coleção no Thunder Client:

Abra o Thunder Client: No VS Code, clique no ícone do Thunder Client na barra lateral (geralmente um raiozinho).

Encontre a Seção "Collections": No painel do Thunder Client, você verá uma seção chamada "Collections" (Coleções).

Crie uma Nova Coleção:

Clique no ícone de "+" (Adicionar Nova Coleção) ao lado do título "Collections" ou procure por um botão como "New Collection".
Uma caixa de diálogo ou um campo aparecerá para você dar um nome à sua coleção. Digite um nome descritivo, por exemplo: API Alunos CRUD.
Você também pode adicionar uma descrição se quiser.
Clique em "Create" ou "Save".
!Exemplo visual (descritivo) de onde clicar para criar uma coleção no Thunder Client (Imagine aqui uma pequena seta apontando para um ícone de "+" ao lado de "Collections" no painel do Thunder Client)

Adicionando Requisições à Coleção:

Opção A: Criar uma nova requisição dentro da coleção:

Clique na coleção que você acabou de criar (ex: API Alunos CRUD).
Dentro da visualização da coleção, clique em "New Request" (ou um ícone de + Request).
Configure sua requisição como você faria normalmente (método, URL, headers, body). Por exemplo, para listar todos os alunos:
Método: GET
URL: http://localhost:3000/
Dê um nome para essa requisição específica (ex: "Listar Todos Alunos e Cursos"). O Thunder Client geralmente permite que você nomeie a aba da requisição, e isso será usado como o nome dela na coleção.
Clique em "Send" para testar e depois salve a requisição (muitas vezes o Thunder Client salva automaticamente quando você fecha a aba da requisição ou tem um botão de salvar específico para a requisição dentro da coleção).
Opção B: Mover uma requisição existente para a coleção (se você já criou alguma fora de uma coleção):

Encontre a requisição que você quer mover na lista de "Activity" ou "History".
Clique com o botão direito na requisição.
Procure por uma opção como "Save to Collection" (Salvar na Coleção) ou "Move to Collection" (Mover para Coleção).
Selecione a coleção API Alunos CRUD da lista.
Organize suas Requisições:

Continue adicionando todas as suas requisições (GET /alunos/:id, POST /alunos, PUT /alunos/:id, DELETE /alunos/:id) à sua coleção API Alunos CRUD. Dê nomes descritivos para cada uma, como:
"Buscar Aluno por ID"
"Adicionar Novo Aluno"
"Atualizar Aluno"
"Remover Aluno"
Você pode até criar pastas dentro de uma coleção para uma organização ainda mais granular, clicando com o botão direito na coleção e escolhendo algo como "New Folder".
Exemplo de estrutura da sua coleção:

plaintext
API Alunos CRUD (Coleção)
├── Listar Todos Alunos e Cursos (GET /)
├── Adicionar Novo Aluno (POST /alunos)
├── Buscar Aluno por ID (GET /alunos/{id})
├── Atualizar Aluno (PUT /alunos/{id})
└── Remover Aluno (DELETE /alunos/{id})
Benefícios de usar Coleções:

Organização: Todas as requisições relacionadas a uma API ou funcionalidade ficam agrupadas.
Reusabilidade: Fácil de encontrar e executar testes novamente.
Compartilhamento (Avançado): Algumas ferramentas permitem exportar coleções para compartilhar com a equipe.
Execução em Lote (Avançado): O Thunder Client permite rodar todas as requisições de uma coleção de uma vez (Runner), o que é ótimo para testes de regressão.
Agora, sempre que você quiser testar sua API de alunos, basta ir à sua coleção API Alunos CRUD no Thunder Client e executar as requisições que precisa

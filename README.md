
------- Primeiros passos para cordar o projeto --------
1) npm init -y  -  (instalar o npm )

2)  npm install express - (instalr express)

3) npm install --save-dev jest - ( inslar jest )


-------------------------------------------------------------------------------



----- Incluir essa linha de código no pacote json para ficar mais claro o resultado dos testes das rotas ----
{

"start": "node main.js",
"test": "jest --coverage"
},

```````````````````````````````````````````````````````````````````````````````````````````````
http://localhost:3000/alunos

Para ver o resultado do seu script de teste `"test":
"jest --coverage"`  no terminal, você precisa executar o comando correspondente ao gerenciador de pacotes que você está usando (npx jest ).

Certifique-se de estar no diretório raiz do seu projeto (onde o arquivo `package.json` está localizado).


```````````````````````````````````````````````````````````````````````````````````````
### Como executar:
bash
✨npm test
``````````````````````````````````````````````````````````````````````````
🎇 Também pode -se usar o comando bash

✨npx jest

Que é o recomendado já que o testes vai usar o jest
````````````````````````````````````````````````````````````````````````````````````````

 Também pode -se usar o comando bash

 npm start 
````````````````````````````````````````````````


✨✨✨Comandos para testar as rotas crud via Thunder Client ou Apidog:

1️ Abra o terminal com o comando CTRT + J logo após digite o comando npx jest e deixe o servidor rodando durante os testes. E copie e cole as rotas abaixo no navegador.
▶️

2️ Rota Principal ▶▶️ http://localhost:3000/ Você deverá ver alguma resposta do seu servidor, como uma lista de alunos e cursos disponíveis, de acordo com o seu teste.

3️ Listar todos os alunos ▶ Se você tem uma rota GET para listar todos os alunos em /alunos, tente http://localhost:3000/alunos. OBS.:Se houver alunos cadastrados.Que será cadastrodo via com ferramentas listados no item 5️

4️ Buscar um aluno específico ▶ Se você tem uma rota GET para buscar um aluno por ID em /alunos/:id, tentar
http://localhost:3000/alunos/1 (substitua o número 1 pelo ID de um aluno que você espera existir).OBS.:Se houver alunos cadastrados.Que será cadastrodo via com ferramentas listados no item 5️

5️ Outras rotas: As outras rotas como ( POST, PUT, DELETE), geralmente não as acessará diretamente pela barra de endereços do navegador para realizar as operações. O navegador geralmente faz requisições GET. Para testar outros métodos HTTP (POST, PUT, DELETE), você precisará de 

6) Create (Criar): Adicionar um novo curso ▶  Para adicionar um novo curso, como "Filosofia", para fazer requisição  POST para o endpoint /cursos:

http://localhost:3000/cursos: 

{
    "cursos": ["Filosofia"]
}

-----------------------------------------------------------------------------------------------------------------------------------------------


ferramentas como:

Insomnia: Um cliente de API que permite criar e enviar requisições HTTP com diferentes métodos, headers e corpos.
Postman: Similar ao Insomnia, muito popular para testar APIs.
Thunder Cleint : Intuitivo e leve que roda dentro co vscode.
````````````````````````````````````````````````````````````````````````````````````````````

```````````````````````````````````````````````````````````````````````````````````````````````

# lista-de-compras

projeto baseado em node

00-estrutura do projeto

Vamos criar a estrutura do projeto e instalar as dependencias na qual vai ser utilizadas durante o projeto.

01-configurando o transpiller

Muitos browser nao tem compatibilidade com o ES6,entao usaremos o transpiller para mudar para um codigo ES5
Babel(transpiller)
adicionando comandos na propiedade script no package.json adicionando nodemon config

02-configurando o express

03-configurando variaveis de ambiente

adicionamos dev arquivo dentro de /environment
adicionamos prd arquivo dentro de /environment
adicionamos enviroment.config dentro de /config
importando arquivo  acima dentro do index

04-configurando rotas e controllers
 criar rotas.config
 no express.config passar a instancia do  express (app)pra dentro do arquivo de rotas
 criar a rota de autenticacao
 registrar no config de rotas
 criar controller de rotas(aqui é uma classe) 
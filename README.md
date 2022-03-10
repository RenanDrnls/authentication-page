# authentication-page

Um pequeno sistema de login, para treinar sessões, validações e verificações de usuários e administradores.
Ainda incompleto, porém com mudanças diárias.

Módulos NodeJS utilizados:
- Express => Para controle de rotas.
- Express-session => Para controle de sessões de usuários.
- Crypto => Para hashing de senha de usuários.
- Cookie-parser => Utilizado para analizar o valor do Cookie e converter para um formato JSON.
- MySQL => Para conexão com Banco de Dados MySQL e execução das querys.
- EJS => Template de JS com HTML.

* Em /src/database coloquei um script para criação do Banco de Dados no MySQL com valores iniciais de usuário padrão e usuário admin para teste.

* Screenschots:

- Form Login "/auth/":

![image](https://user-images.githubusercontent.com/43563007/157667098-1ae729a3-c5a5-472b-9829-0e77ab1fa54c.png)

- Form Criação de usuário "/new-user/add-user":

![image](https://user-images.githubusercontent.com/43563007/157667231-3335085f-308b-4c44-aed4-323cd0e1b71c.png)

- Tela inicial usuário padrão "/user/home":
![image](https://user-images.githubusercontent.com/43563007/157667363-004200b0-a6ba-4f8d-8be5-222ab7e85ae6.png)

- Tela inicial usuário Admin "/admin/home":

![image](https://user-images.githubusercontent.com/43563007/157667452-3b467d23-f630-4f1f-97c2-dd351860423b.png)


Obrigado por visitar.

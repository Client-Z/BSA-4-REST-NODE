# BSA-4-REST-NODE
Реализовать бекенд для чата. Создать 2 сущности - пользователи и сообщения.

    Каждая из сущностей реализовывает CRUD (create, read, update, delete) через REST (post, get, put, delete).
    Сущность пользователя содержит базовые поля (имя и пр.)
    Сущность сообщения содержит senderId и receiverId (id пользователей), а также тело сообщения.
    Создать роут, который возвращает всех пользователей, с которыми общался пользователь с данным id.
    Данные можно хранить в памяти (как в примере) или в MongoDB.
    Разбить ответственность модулей бекенда аналогично примеру - routes, services, опционально repositories.
    Описать все роуты в README.md репозитория

Запросы отсылать через Postman или другой аналогичный инструмент (https://www.getpostman.com/postman)


Routes's description:

    message.js
    1.1 Create message : POST, url: '/messages/ '
    1.2 Read all messages : GET, url: '/messages/ '
    1.2 Update message : PUT, url: '/messages/:id '
    1.2 Delete message : DELETE, url: '/messages/:id '

    user.js
    1.1 Create user : POST, url: '/users/ '
    1.2 Read all users : GET, url: '/users/ '
    1.2 Update user : PUT, url: '/users/:id '
    1.2 Delete user : DELETE, url: '/users/:id '

    history.js - routing for instance of history
    Роут который должен возвращать всех пользователей, с которыми общался пользователь с данным id.   
    ( GET, url: '/:id/collocutors ' )

Run application: node index.js or nodemon index.js   
localhost:1428

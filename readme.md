[GET]

- /robots

  - Array con todos los robots.

- /robots/:idRobot

  - Robot por ID.

[POST*]

- /robots/create

  - Recibe un robot (sin id), lo crea en la BD y devuelve el robot recién creado.

[PUT*]

- /robots/update

  - Recibe un robot, modifica en la BD el robot con la misma id que el recibido, y devuelve el robot modificado.

[DELETE*]

- /robots/delete/:idRobot

  - Elimina de la BD un robot por id y devuelve un objeto con la id.

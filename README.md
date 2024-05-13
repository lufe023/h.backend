# Ecommerce API

## Descripción

Ecommerce API es una aplicación backend construida con Express y PostgreSQL, utilizando Sequelize ORM para interactuar con la base de datos. Proporciona una solución completa para desarrollar aplicaciones de comercio electrónico, con funcionalidades de autenticación de usuarios, gestión de productos, carrito de compras y pedidos.

## Tecnologías Utilizadas

-   **Express**: Framework web para Node.js que se utiliza para construir la API REST.
-   **PostgreSQL**: Sistema de gestión de bases de datos relacional.
-   **Sequelize ORM**: ORM (Object-Relational Mapping) para Node.js, utilizado para interactuar con la base de datos PostgreSQL.
-   **Autenticación con Tokens**: Utiliza JSON Web Tokens (JWT) para manejar la autenticación de usuarios.
-   **Bcrypt**: Librería para el hash de contraseñas.

## Funcionalidades

-   **Autenticación de Usuarios**:

    -   `/api/auth/login`: Permite a un usuario iniciar sesión. Se requiere el email y la contraseña del usuario. Retorna un token de autenticación en caso de éxito.
    -   `/api/auth/register`: Permite a un usuario registrarse en la aplicación. Se requieren el nombre, email y contraseña del usuario.

-   **Gestión de Productos**:

    -   `/api/products`: Endpoints para crear, obtener, actualizar y eliminar productos.

-   **Gestión de Carrito de Compras**:

    -   `/api/cart`: Funcionalidades para agregar productos al carrito, eliminar productos y obtener el contenido del carrito.

-   **Gestión de Pedidos**:
    -   `/api/orders`: Permite a los usuarios realizar pedidos, ver el historial de pedidos y obtener detalles de pedidos específicos.

## Estructura del Proyecto

El proyecto sigue la siguiente estructura:

1. `app.js`: Archivo principal de la aplicación.
2. `.env`: Archivo de configuración para variables de entorno.
3. `config.js`: Configuración de la base de datos y otros parámetros.
4. `database.js`: Configuración de la conexión con la base de datos.
5. `models`: Directorio para los modelos de Sequelize.
6. `controllers`: Directorio para los controladores de las rutas.
7. `services`: Directorio para los servicios de la aplicación.
8. `routes`: Directorio para definir las rutas de la API.

## Instalación y Uso

1. Clona el repositorio: `git clone https://github.com/usuario/h.backend.git`.
2. Instala las dependencias: `npm install`.
3. Configura las variables de entorno en el archivo `.env`.
4. Ejecuta la aplicación: `npm start`.

## Contribuir

Si quieres contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama: `git checkout -b nueva-funcionalidad`.
3. Haz tus cambios y haz commit: `git commit -am 'Agregar nueva funcionalidad'`.
4. Haz push a la rama: `git push origin nueva-funcionalidad`.
5. Envía un pull request.

¡Gracias por tu contribución!

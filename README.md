# Ecommerce API

## Descripción
Ecommerce API es una aplicación backend construida con Express y PostgreSQL, utilizando Sequelize ORM para interactuar con la base de datos. Proporciona una solución completa para desarrollar aplicaciones de comercio electrónico, con funcionalidades de autenticación de usuarios, gestión de productos, carrito de compras y pedidos.

## Tecnologías Utilizadas
- **Express:** Framework web para Node.js que se utiliza para construir la API REST.
- **PostgreSQL:** Sistema de gestión de bases de datos relacional.
- **Sequelize ORM:** ORM (Object-Relational Mapping) para Node.js, utilizado para interactuar con la base de datos PostgreSQL.
- **Autenticación con Tokens:** Utiliza JSON Web Tokens (JWT) para manejar la autenticación de usuarios.
- **Bcrypt:** Librería para el hash de contraseñas.

## Funcionalidades
### Autenticación de Usuarios:
- `POST /api/auth/login`: Permite a un usuario iniciar sesión. Se requiere el email y la contraseña del usuario. Retorna un token de autenticación en caso de éxito.
- `POST /api/auth/register`: Permite a un usuario registrarse en la aplicación. Se requieren el nombre, email y contraseña del usuario.

### Gestión de Productos:
- `GET /api/products`: Obtener todos los productos.
- `POST /api/products`: Crear un nuevo producto.
- `PUT /api/products/:id`: Actualizar un producto existente.
- `DELETE /api/products/:id`: Eliminar un producto.

### Gestión de Carrito de Compras:
- `POST /api/cart`: Agregar productos al carrito.
- `DELETE /api/cart/:id`: Eliminar productos del carrito.
- `GET /api/cart`: Obtener el contenido del carrito.

### Gestión de Pedidos:
- `POST /api/orders`: Permite a los usuarios realizar pedidos.
- `GET /api/orders`: Ver el historial de pedidos.
- `GET /api/orders/:id`: Obtener detalles de pedidos específicos.

## Estructura del Proyecto
El proyecto sigue la siguiente estructura:

- `app.js`: Archivo principal de la aplicación.
- `.env`: Archivo de configuración para variables de entorno.
- `config.js`: Configuración de la base de datos y otros parámetros.
- `database.js`: Configuración de la conexión con la base de datos.
- `models/`: Directorio para los modelos de Sequelize.
- `controllers/`: Directorio para los controladores de las rutas.
- `services/`: Directorio para los servicios de la aplicación.
- `routes/`: Directorio para definir las rutas de la API.

## Instalación y Uso
1. Clona el repositorio:
   ```sh
   git clone https://github.com/usuario/h.backend.git

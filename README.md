# Ecommerce API

## Descripción
Ecommerce API es una aplicación backend construida con Express y PostgreSQL, utilizando Sequelize ORM para interactuar con la base de datos. Proporciona una solución completa para desarrollar aplicaciones de comercio electrónico, con funcionalidades de autenticación de usuarios, gestión de productos, carrito de compras y pedidos.

La aplicación está desplegada y disponible en [Click Aquí](https://hbackend-production.up.railway.app).

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

2. Instala las dependencias:
   npm install

3. Configura las variables de entorno en el archivo .env:

```plaintext
#### Entorno en que se encuentra mi aplicacion
NODE_ENV=production

#### Variables de entorno de mi base de datos
DB_HOST=
DB_USERNAME=
DB_PASS=
DB_NAME=
DB_PORT=
JWT_SECRET=

#### Variables backend
BK_HOST=
PORT=

#### Email Host Configuration for NODEMAILER
EMAIL_HOST_USER=
PASSWORD_HOST_USER=
HOST_EMAIL_SENDER=
HOST_EMAIL_PORT=
```

4. Ejecuta la aplicación:
   npm start


## Contribuir

Si quieres contribuir a este proyecto, por favor sigue estos pasos:

#### Haz un fork del proyecto.
Crea una nueva rama:
``` bash
git checkout -b nueva-funcionalidad

 ```

Haz tus cambios y haz commit:
``` bash
git commit -am 'Agregar nueva funcionalidad'

 ```

Haz push a la rama:
``` bash
git push origin nueva-funcionalidad

```
Envía un pull request.




# API REFERENCE

Obten toda la [documentación](https://documenter.getpostman.com/view/25294531/2sA3QmCZbk)

### Desafío Técnico: API REST para E-commerce

La API REST para E-commerce es una solución creada como parte de un desafío técnico para evaluar conocimientos en desarrollo backend. Esta API proporciona funcionalidades esenciales para un sistema de comercio electrónico, incluyendo autenticación de usuarios, gestión de productos, carrito de compras y pedidos.

### Características principales:

- **Autenticación JWT**: Se utiliza JSON Web Tokens (JWT) para manejar la autenticación de usuarios.
    
- **Encriptación de contraseñas**: Las contraseñas se almacenan en la base de datos encriptadas utilizando Bcrypt.
    
- **Gestión de Productos**: Se incluyen endpoints para crear, actualizar, eliminar y obtener detalles de productos.
    
- **Gestión de Carrito de Compras**: Funcionalidades para agregar productos al carrito, eliminar productos y obtener el contenido del carrito.
    
- **Gestión de Pedidos**: Se permite a los usuarios realizar pedidos, ver el historial de pedidos y obtener detalles de pedidos específicos.
    

### Tecnologías utilizadas:

- **Express**: Framework web para Node.js que se utiliza para construir la API REST.
    
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.
    
- **Sequelize ORM**: ORM (Object-Relational Mapping) para Node.js, utilizado para interactuar con la base de datos PostgreSQL.
    
- **Bcrypt**: Librería para el hash de contraseñas.
    
- **Json Web Token**: Implementación de JWT para Node.js.
    
- **Nodemailer**: Módulo para enviar correos electrónicos, utilizado en la recuperación de contraseñas.
    

### Endpoints y funcionalidades:

1. **Autenticación de usuarios**:
    - Endpoint: `/api/auth/login`
        
    - Método: POST
        
    - Descripción: Permite a un usuario iniciar sesión. Se requiere el email y la contraseña del usuario. Retorna un token de autenticación en caso de éxito.
        
2. **Registro de usuarios**:
    - Endpoint: `/api/auth/register`
        
    - Método: POST
        
    - Descripción: Permite a un usuario registrarse en la aplicación. Se requieren el nombre, email y contraseña del usuario.
        
3. **Gestión de Productos**:
    - Endpoint: `/api/products`
        
    - Métodos: GET (obtener todos los productos), POST (crear un nuevo producto)
        
    - Descripción: Permite crear, obtener, actualizar y eliminar productos.
        
4. **Gestión de Carrito de Compras**:
    - Endpoint: `/api/cart`
        
    - Métodos: GET (obtener contenido del carrito), POST (agregar producto al carrito), DELETE (eliminar producto del carrito)
        
    - Descripción: Permite agregar productos al carrito, eliminar productos y obtener el contenido del carrito.
        
5. **Gestión de Pedidos**:
    - Endpoint: `/api/orders`
        
    - Métodos: GET (obtener todos los pedidos), POST (realizar un nuevo pedido)
        
    - Descripción: Permite a los usuarios realizar pedidos, ver el historial de pedidos y obtener detalles de pedidos específicos.
        

Cada endpoint incluye instrucciones detalladas sobre su uso y los parámetros requeridos, incluidos en esta documentación.

## Author

- GitHub: [@lufe023](https://github.com/lufe023)
- LinkedIn: [Luis Gómez ](https://www.linkedin.com/in/luisgomez023/)
- Correo: [lufe023@gmail.com](https://github.com/lufe023)
- Web: [MiElector](https://mielector.com/)

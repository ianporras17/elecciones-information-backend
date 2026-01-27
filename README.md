# Backend (NestJS + PostgreSQL + Docker)

Este documento explica:
- Dónde se modifica la creación de tablas (schema inicial)
- Cómo está organizada la arquitectura RESTful del proyecto
- Qué hace cada carpeta (DAO, DTO, middleware, modules)
- Orden recomendado de archivos dentro de cada módulo (controller/service/model)

---

## 1) ¿Dónde se crean/modifican las tablas?

### Base de datos y creación de tablas (Prisma)

Este proyecto usa **Prisma** como ORM/migraciones.  
La “fuente de verdad” del schema NO es un `init.sql`, sino:

- `prisma/schema.prisma` → definición de modelos/tablas.
- `prisma/migrations/` → migraciones versionadas (lo que garantiza que todos tengan las mismas tablas).

### ¿Dónde modifico/agrego tablas?
1) Editá `prisma/schema.prisma` (agregá/ajustá modelos y campos).
2) Generá una migración nueva.

### Comandos principales (Docker)

> Ejecutar dentro del contenedor `api`:

**Generar Prisma Client (solo tipos/cliente):**
```bash
docker compose exec api npx prisma generate
Crear y aplicar migración en desarrollo (genera carpeta en prisma/migrations):

docker compose exec api npx prisma migrate dev --name nombre_del_cambio
Aplicar migraciones existentes (ideal para compañeros / producción):

docker compose exec api npx prisma migrate deploy

---

## 2) Archivos Docker (qué hacen y dónde van)

Todos estos archivos van en la **raíz del backend** (a la par de `package.json`):

- `docker-compose.yml`  
  Levanta **db** (Postgres) + **api** (NestJS) en contenedores.

- `Dockerfile`  
  Define la imagen del servicio `api`.

- `.env`  
  Variables de entorno (DB host/usuario/clave/nombre).

- `.dockerignore`  
  Evita copiar cosas innecesarias a la imagen.

---

## 3) Estructura RESTful del proyecto (carpetas)

### `src/config/`
Configuración global del proyecto:
- Validación de variables de entorno (Joi)
- Constantes o helpers de configuración

Ejemplos:
- `env.validation.ts` (reglas: POSTGRES_HOST, POSTGRES_DB, etc.)

---

### `src/database/`
Todo lo relacionado a la conexión a Postgres:
- Providers de Nest para crear el Pool
- Servicio `PostgresService` para ejecutar queries
- Constantes de tokens de inyección (ej: `PG_POOL`)
- `init.sql` (schema inicial)

Archivos típicos:
- `postgres.constants.ts`
- `postgres.module.ts`
- `postgres.service.ts`
- `init.sql`

---

### `src/dao/`
**DAO (Data Access Object)** = capa de acceso a datos.
Aquí viven clases/funciones que:
- Ejecutan queries
- Hablan directo con la base de datos (usando `PostgresService` o un ORM)
- Devuelven resultados al Service

Ejemplo:
- `users.dao.ts` con métodos `findByEmail()`, `createUser()`, etc.

> Regla: el DAO **no debería** manejar HTTP, ni validación de request; solo datos.

---

### `src/dtos/`
**DTO (Data Transfer Object)** = estructuras/contratos para entrada/salida.

Se usan para:
- Validar request bodies (Create/Update)
- Definir qué campos se devuelven al cliente (Response DTO)
- Evitar exponer internamente la estructura tal cual de la DB

Ejemplos:
- `create-user.dto.ts`
- `login.dto.ts`
- `user-response.dto.ts`

---

### `src/middleware/`
**Middleware** corre antes de llegar al controller.
Se usa para:
- Logging
- Request IDs
- Medir tiempos
- Validaciones simples (no de negocio)

Ejemplos:
- `logger.middleware.ts`
- `request-id.middleware.ts`

---

### `src/modules/`
Aquí van los **módulos funcionales** (feature modules), ej:
- `auth/`
- `rooms/`
- `topics/`
- `external-resources/`
- `health/`

Cada módulo es autónomo: tiene controller + service + (dao/dtos/models si aplica).

---

## 4) Orden recomendado dentro de un módulo (RESTful)

Ejemplo módulo: `src/modules/auth/`

### Archivos base (siempre)
1. `auth.module.ts`  
   Registra providers, imports, controllers.

2. `auth.controller.ts`  
   Maneja rutas HTTP REST:
   - `POST /auth/login`
   - `POST /auth/register`
   - etc.

3. `auth.service.ts`  
   Lógica de negocio:
   - Validar credenciales
   - Llamar a DAO
   - Generar token (si aplica)
   - Reglas del dominio

### Carpetas opcionales (pero recomendadas)
4. `dao/`  
   Acceso a DB (queries/ORM):
   - `auth.dao.ts` o `users.dao.ts`

5. `dtos/`  
   Contratos de request/response:
   - `login.dto.ts`
   - `register.dto.ts`
   - `auth-response.dto.ts`

6. `models/` o `entities/` (según tu estilo/ORM)
- **Model/Entity** representa estructura de datos.
- Si usas SQL directo, puede ser interfaces/types:
  - `user.model.ts` (interface UserRow)
- Si usas ORM, suele llamarse `entities/`:
  - `user.entity.ts`

---

## 5) ¿Qué hace cada capa?

### Controller
- Recibe request HTTP
- Valida entrada (DTO + pipes)
- Llama al Service
- Devuelve response

### Service
- Aplica reglas de negocio
- Coordina llamadas a DAOs/otros services
- No debería saber de detalles HTTP (status codes explícitos en exceso)

### DAO
- Hace queries/ORM
- Devuelve datos crudos o estructurados
- No hace reglas de negocio complejas

### DTO
- Define el formato esperado (input/output)
- Evita mezclar datos internos con los del cliente

### Model/Entity
- Representa datos: filas de DB o entidad de dominio (según ORM)

---

## 6) Endpoints de prueba

### Health
- **GET** `http://localhost:3000/health`

Si health hace `SELECT 1`:
- Si responde OK, la API y la DB están conectadas.

---

## 7) Comandos Docker útiles

### Levantar (DB + API)
```bash
docker compose up -d --build
```

### Ver logs API
```bash
docker compose logs -f api
```

### Apagar (sin borrar DB)
```bash
docker compose down
```

### Reset total (borra DB/volumen)
```bash
docker compose down --volumes
docker compose up -d --build --force-recreate
```

---

## 8) Nota final (nombres de carpetas)
Para evitar problemas en Docker (Linux), usá nombres en minúscula:
- `dao/` (no `Dao/`)
- `dtos/` (no `Dtos/`)


FROM node:20-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código
COPY . .

# Prisma client (necesario en runtime)
RUN npx prisma generate

EXPOSE 3000

# Modo desarrollo (hot reload, logs claros)
CMD ["npm", "run", "start:dev"]

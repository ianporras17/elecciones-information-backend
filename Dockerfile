FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Instala todas las dependencias para poder compilar
RUN npm ci || npm install

COPY . .

# Compilar el proyecto NestJS
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production || npm install --only=production

COPY . .

# Compilar el proyecto NestJS
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

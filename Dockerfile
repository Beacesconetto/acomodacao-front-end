# Usando a imagem oficial do Node.js
FROM node:18 AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json e package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código do projeto para dentro do contêiner
COPY . .

# Build do projeto (cria os arquivos estáticos)
RUN npm run build

# Usando uma imagem mais leve para servir o front-end
FROM nginx:alpine

# Copia os arquivos build para o Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expondo a porta 80 para o tráfego web
EXPOSE 80

# Inicia o Nginx para servir a aplicação
CMD ["nginx", "-g", "daemon off;"]

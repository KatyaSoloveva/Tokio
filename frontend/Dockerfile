FROM node:22.14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["cp", "-r", "dist", "result_build"]
FROM node:22.14

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

CMD [ "npm", "run", "dev",  "--", "--host", "0.0.0.0", "--port", "5173" ]
# 프로젝트 구조
```sh
mkdir project
cd project 
# 백엔드 서버
mkdir server
# 클라이언트는 Quasar로 생성
```

## client
### Quasar 프레임워크
```sh
npm install -g @quasar/cli
quasar create client

? Project name (internal usage for dev) client
? Project product name (must start with letter if building mobile apps) Web Service
? Project description 기본 프로젝트
? Author softallice <s991045@gmail.com>
? Pick your favorite CSS preprocessor: (can be changed later) SCSS
? Pick a Quasar components & directives import strategy: (can be changed later) Auto import
? Check the features needed for your project: ESLint (recommended), Vuex, Axios, Vue-i18n
? Pick an ESLint preset: Prettier
? Continue to install project dependencies after the project has been created? (recommended) yarn

```
## server
### feathers 프레임워크
```sh
npm install @feathersjs/cli -g
cd server
feathers generate app

? Do you want to use JavaScript or TypeScript? JavaScript
? Project name server
? Description 기본 프로젝트
? What folder should the source files live in? src
? Which package manager are you using (has to be installed globally)? Yarn
? What type of API are you making? REST, Realtime via Socket.io
? Which testing framework do you prefer? Mocha + assert
? This app uses authentication Yes
? Which coding style do you want to use? ESLint
? What authentication strategies do you want to use? (See API docs for all 180+ supported oAuth providers) Username + Password (Local), Googl
e, Facebook, GitHub
? What is the name of the user (entity) service? users
? What kind of service is it? Mongoose
? What is the database connection string? mongodb://localhost:27017/server


server/config/default.json
 "mongodb": "mongodb://localhost:27017/server" >> "mongodb": "mongodb://localhost:27017/api" 변경
```
## DB(도커 이용해서 변경)
###  MongoDB 사용
### studio 3T 사용


```yaml
version: '3.3'
services:
  mongo:
    image: mongo:latest
    ports:
      - 27017:27017
    volumes:
      - mongodb_container:/data/db
    networks:
      - demo-net
#   app:
#     image: node:lts-alpine
#     working_dir: /client
#     volumes:
#       - ./client:/client
#     ports:
#       - 8085:8085
#     networks:
#       - demo-net
#     command: >
#       sh -c "npm install -g @quasar/cli && npm install &&
#              quasar dev"
    

#   server:
#     image: node:lts-alpine
#     working_dir: /server
#     volumes:
#       - ./server:/server
#     ports:
#       - 3030:3030
#     depends_on:
#       - mongo
#       - postgresql
#     # NODE_ENV variable is used by feathersjs to determine which config
#     # file to merge with the default.json file. Update as needed.
#     environment:
#       NODE_ENV: dev
#     command: >
#       sh -c "npm install && npm run dev-test"
#     networks:
#       - demo-net
 

volumes:
  mongodb_container:
  postgresql_container:

networks:
  demo-net:
```
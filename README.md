# DB + SERVER
1. .env.example 파일을 .env로 이름을 변경한다.

2. env파일에 내용을 채워넣는다.
    ```dotenv
    DB_HOST=mysql_db
    DB_PORT=3306
    DB_USERNAME=root
    DB_DEV_PASSWORD=
    DB_TEST_PASSWORD=
    DB_PROD_PASSWORD=
    DB_DBNAME=tamastudy
    COOKIE_SECRET=
    ```
3. docker로 컨테이너를 띄운다.
    ```bash
   $ docker-compose up -d
   ```
   
    >브라우저에서 Adminer에 접속해본다. 
    > 1. http://localhost:8080
    > 2. 서버, 사용자이름, 비밀번호, 데이터베이스(tamastudy) 입력 후 로그인

# CLIENT
1. npm install
    ```bash
   $ npm install
   ```
2. npm run dev
    ```bash
   $ npm run dev
   ```

# 브라우저 & 포스트맨에서 테스트
http://localhost:3000
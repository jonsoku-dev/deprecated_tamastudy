# 처음이신분

```bash
$ npm install
$ npm run dev
```

# .env.example

```bash
$ cp .env.example .env
$ vim .env
```

이후 mysql 정보를 넣고 저장합니다.

sns 로그인 관련 정보
https://tamastudy.atlassian.net/browse/JNDS-20?atlOrigin=eyJpIjoiYzA4NTdjZGNmMGMyNDczNmE1YmRmMzE4YTdhYjE1NzkiLCJwIjoiaiJ9

# migration

```bash
$ npm run db:makemigrations --name "mega-migration"
```

# auto create db after started node app

(link)[https://www.it-swarm.dev/fr/sequelize.js/sequelize-create-database/1055016586/]

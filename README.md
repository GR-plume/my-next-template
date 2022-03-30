色々なexampleを悪魔合体させたやつ。自分用。

- Next.js
  - custom-server-typescript (TypeScript)
  - custom-server-express (Express)
  - with-passport (Passport.js)
- React の global state (useReducer + useContext)
- Socket.io
- Prisma
- MySQL (PlanetScale に移行予定)
- (style は SCSS (FLOCSS) or TailwindCSS の予定)

Prismaの環境変数DATABASE_URLは.env.localに入れてる(git管理にmysqlのパスワード入れたくない)のでPrismaのmigrateするときはdotenv-cliを`npm i -g`して`dotenv -e .env.local -- npx prisma migrate dev --name init`
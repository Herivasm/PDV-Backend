# DEV 

1. Install dependencies: `npm install`
2. Create the `.env` file based on the `.env.template`
3. Create `PORT` and `DATABASE_URL` variables in `.env`
4. Initialize Prisma `npx primsa init`
5. Generate prisma artifacts `npx prisma generate`
5. Run Prisma Migrations: `npx prisma migrate dev`
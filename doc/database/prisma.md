# Prisma

[Prisma Document](https://www.prisma.io/docs/orm)

## Create Prisma with database table

### Model

Create your model

```ts
model Test {
    id Int @id @default(autoincrement())
    name String
    email String @unique
    description String
}
```

### Migrate ( Migrate - to create table or collections in your database)

Migrate your prisma - [Migrate](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production)

```bash

npx prisma migrate dev

```

### Seed ( to create dummy data )

Seed your prisma - [Seed](https://www.prisma.io/docs/orm/prisma)

#### Add to your package.json

```bash
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

#### Seed.ts

```ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.test.create({
    data: {
      name: "hello",
      email: "hello@one.com",
      description: "lorem Ipsum",
    },
  });
  const bi = await prisma.test.create({
    data: {
      name: "bi",
      email: "bi@one.com",
      description: "Testing one two",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

#### CLI

> **_NOTE:_** When we migrate, it automatically use this command. IF prisma seed script in package.json.

```bash
npx prisma db seed
```

## For Relational Database

Sample - [document](https://www.prisma.io/docs/orm/prisma-schema/data-model/models)

```bash

datasource db {
    provider = "mysql"
    url = env("DATABASE_URL")
}

generator client {
    provider = "prisma-client-js"
}

model Test {
    id Int @id @default(autoincrement())
    name String
    email String @unique
    description String
}


```

## For Non-Relational Database

Sample - [document](https://www.prisma.io/docs/orm/prisma-schema/data-model/models)

```bash

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id      String   @id @default(auto()) @map("_id") @db.ObjectId
  email   String   @unique
  name    String?
  role    Role     @default(USER)
  posts   Post[]
  profile Profile?
}

model Profile {
  id     String @id @default(auto()) @map("_id") @db.ObjectId
  bio    String
  user   User   @relation(fields: [userId], references: [id])
  userId String @unique @db.ObjectId
}

model Post {
  id          String     @id @default(auto()) @map("_id") @db.ObjectId
  createdAt   DateTime   @default(now())
  title       String
  published   Boolean    @default(false)
  author      User       @relation(fields: [authorId], references: [id])
  authorId    String     @db.ObjectId
  categoryIDs String[]   @db.ObjectId
  categories  Category[] @relation(fields: [categoryIDs], references: [id])
}

model Category {
  id      String   @id @default(auto()) @map("_id") @db.ObjectId
  name    String
  postIDs String[] @db.ObjectId
  posts   Post[]   @relation(fields: [postIDs], references: [id])
}

enum Role {
  USER
  ADMIN
}


```

## Authors

- [@kaungkahntzaw](https://www.github.com/kaungkhantzawdev)

## License

[MIT](https://choosealicense.com/licenses/mit/)

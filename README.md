On windows Environment
On cmd

Step 1: Initialize the Next.js Project
 -npx create-next-app@latest next --typescript
 -cd next
 
Step 2: Install Dependencies
 -npm install @prisma/client @next-auth/prisma-adapter next-auth
 -npm install prisma typescript zod postgresql
 -npx prisma init

Step 3: Install tailwindcss
 -npm install tailwindcss @tailwindcss/postcss postcss
 -create a ./styles/globals.css file and input.
   @import "tailwindcss";

Step 4: Configure PostgreSQL & Prisma Schema
 -In .env file, update your database URL:
  DATABASE_URL="postgresql://postgres:123456@localhost:5432/diagnostic_tests"
 -Modify prisma/schema.prisma:
    model DiagnosticTest {
        id          String   @id @default(uuid())
        patientName String
        testType    String
        result      String
        testDate    DateTime
        notes       String?
        createdAt   DateTime @default(now())
    }
 -cmd execution
   npx prisma migrate dev --name init
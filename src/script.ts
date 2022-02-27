import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken"
import { APP_SECRET } from "./utils/auth";

const prisma = new PrismaClient()

async function main() {
  console.log(APP_SECRET)
  const token = jwt.sign({ userId: 1 }, APP_SECRET)
  console.log(token)
  const a = jwt.verify(token, APP_SECRET)
  console.log(a)
}

main()
  .catch(e => { throw e })
  .finally(async () => {
    await prisma.$disconnect()
  })

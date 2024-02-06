import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
declare global {
   var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient()
   .$extends({
      query: {
         $allModels: {
            async create({ args, query }) {
               args.data = {
                  ...args.data,
                  id: nanoid(15),
               }

               return query(args)
            }
         }
      }

   });
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;

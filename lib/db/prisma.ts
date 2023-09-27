import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prismaBase = globalForPrisma.prisma ?? prismaClientSingleton();

export const prisma = prismaBase.$extends({

});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaBase;

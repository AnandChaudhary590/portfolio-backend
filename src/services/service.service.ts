import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

interface ServiceInput {
  title: string;
  description: string;
  icon?: string;
}

export const getServices = async () => {
  return prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const createService = async (data: ServiceInput) => {
  return prisma.service.create({
    data: {
      title: data.title,
      description: data.description,
      icon: data.icon,
    },
  });
};

export const updateService = async (
  id: string,
  data: ServiceInput
) => {
  return prisma.service.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      icon: data.icon,
    },
  });
};

export const deleteService = async (id: string) => {
  return prisma.service.delete({
    where: { id },
  });
};
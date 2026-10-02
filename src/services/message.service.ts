import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const getMessages = async () => {
  return prisma.message.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createMessage = async (data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) => {
  return prisma.message.create({
    data: {
      name: data.name,
      email: data.email,
      subject: data.subject || null,
      message: data.message,
    },
  });
};

export const markMessageAsRead = async (id: string) => {
  return prisma.message.update({
    where: {
      id,
    },
    data: {
      isRead: true,
    },
  });
};

export const deleteMessage = async (id: string) => {
  return prisma.message.delete({
    where: {
      id,
    },
  });
};
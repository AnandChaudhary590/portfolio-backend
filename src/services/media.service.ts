import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

interface MediaInput {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
}

export const createMedia = async (data: MediaInput) => {
  return prisma.media.create({
    data: {
      filename: data.filename,
      originalName: data.originalName,
      mimeType: data.mimeType,
      size: data.size,
      url: data.url,
    },
  });
};

export const getMedia = async () => {
  return prisma.media.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
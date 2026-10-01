import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const getAbout = async () => {
  return prisma.about.findFirst({
    orderBy: {
      createdAt: "asc",
    },
  });
};

interface UpdateAboutInput {
  title: string;
  description: string;
  profileImage?: string;
  resumeUrl?: string;
}

export const updateAbout = async (data: UpdateAboutInput) => {
  const existingAbout = await prisma.about.findFirst({
    orderBy: {
      createdAt: "asc",
    },
  });

  if (existingAbout) {
    return prisma.about.update({
      where: {
        id: existingAbout.id,
      },
      data: {
        title: data.title,
        description: data.description,
        profileImage: data.profileImage,
        resumeUrl: data.resumeUrl,
      },
    });
  }

  return prisma.about.create({
    data: {
      title: data.title,
      description: data.description,
      profileImage: data.profileImage,
      resumeUrl: data.resumeUrl,
    },
  });
};
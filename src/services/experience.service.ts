import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

interface ExperienceInput {
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
}

export const getExperiences = async () => {
  return prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });
};

export const createExperience = async (data: ExperienceInput) => {
  return prisma.experience.create({
    data: {
      company: data.company,
      position: data.position,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      location: data.location,
    },
  });
};

export const updateExperience = async (
  id: string,
  data: ExperienceInput
) => {
  return prisma.experience.update({
    where: { id },
    data: {
      company: data.company,
      position: data.position,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      location: data.location,
    },
  });
};

export const deleteExperience = async (id: string) => {
  return prisma.experience.delete({
    where: { id },
  });
};
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

interface SkillInput {
  name: string;
  category: string;
  level?: number;
  icon?: string;
}

export const getSkills = async () => {
  return prisma.skill.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createSkill = async (data: SkillInput) => {
  return prisma.skill.create({
    data: {
      name: data.name,
      category: data.category,
      level: data.level,
      icon: data.icon,
    },
  });
};

export const updateSkill = async (
  id: string,
  data: SkillInput
) => {
  return prisma.skill.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      category: data.category,
      level: data.level,
      icon: data.icon,
    },
  });
};

export const deleteSkill = async (id: string) => {
  return prisma.skill.delete({
    where: {
      id,
    },
  });
};
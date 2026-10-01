import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

interface ProjectInput {
  title: string;
  description: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured?: boolean;
}

export const getProjects = async () => {
  return prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createProject = async (data: ProjectInput) => {
  return prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      image: data.image,
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl,
      technologies: data.technologies,
      featured: data.featured ?? false,
    },
  });
};

export const updateProject = async (
  id: string,
  data: ProjectInput
) => {
  return prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      image: data.image,
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl,
      technologies: data.technologies,
      featured: data.featured ?? false,
    },
  });
};

export const deleteProject = async (id: string) => {
  return prisma.project.delete({
    where: { id },
  });
};
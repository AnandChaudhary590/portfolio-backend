import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

interface TestimonialInput {
  name: string;
  role?: string;
  company?: string;
  message: string;
  image?: string;
}

export const getTestimonials = async () => {
  return prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const createTestimonial = async (data: TestimonialInput) => {
  return prisma.testimonial.create({
    data: {
      name: data.name,
      role: data.role,
      company: data.company,
      message: data.message,
      image: data.image,
    },
  });
};

export const updateTestimonial = async (
  id: string,
  data: TestimonialInput
) => {
  return prisma.testimonial.update({
    where: { id },
    data: {
      name: data.name,
      role: data.role,
      company: data.company,
      message: data.message,
      image: data.image,
    },
  });
};

export const deleteTestimonial = async (id: string) => {
  return prisma.testimonial.delete({
    where: { id },
  });
};
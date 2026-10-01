import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

interface BlogInput {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  published?: boolean;
  publishedAt?: Date;
}

export const getBlogs = async () => {
  return prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const createBlog = async (data: BlogInput) => {
  return prisma.blog.create({
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      published: data.published ?? false,
      publishedAt: data.publishedAt,
    },
  });
};

export const updateBlog = async (id: string, data: BlogInput) => {
  return prisma.blog.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      published: data.published ?? false,
      publishedAt: data.publishedAt,
    },
  });
};

export const deleteBlog = async (id: string) => {
  return prisma.blog.delete({
    where: { id },
  });
};
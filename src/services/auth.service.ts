import "dotenv/config";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { generateAccessToken } from "../utils/jwt";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

interface LoginInput {
  email: string;
  password: string;
}

const REFRESH_TOKEN_DAYS = 7;

const hashRefreshToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const loginAdmin = async ({ email, password }: LoginInput) => {
  const admin = await prisma.user.findUnique({
    where: { email },
  });

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Invalid email or password");
  }

  const passwordMatched = await bcrypt.compare(
    password,
    admin.passwordHash
  );

  if (!passwordMatched) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken({
    userId: admin.id,
    email: admin.email,
    role: admin.role,
  });

  const refreshToken = crypto.randomBytes(64).toString("hex");
  const tokenHash = hashRefreshToken(refreshToken);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_DAYS);

  await prisma.refreshToken.create({
    data: {
      tokenHash,
      userId: admin.id,
      expiresAt,
    },
  });

  return {
    user: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const tokenHash = hashRefreshToken(refreshToken);

  const storedToken = await prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: {
      user: true,
    },
  });

  if (!storedToken) {
    throw new Error("Invalid refresh token");
  }

  if (storedToken.expiresAt < new Date()) {
    await prisma.refreshToken.delete({
      where: { id: storedToken.id },
    });

    throw new Error("Refresh token expired");
  }

  if (storedToken.user.role !== "ADMIN") {
    throw new Error("Access denied");
  }

  const accessToken = generateAccessToken({
    userId: storedToken.user.id,
    email: storedToken.user.email,
    role: storedToken.user.role,
  });

  return {
    accessToken,
  };
};
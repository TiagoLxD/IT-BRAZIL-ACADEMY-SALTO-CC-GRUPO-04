import { mockDeep, mockReset } from "vitest-mock-extended";
import { PrismaClient } from "@prisma/client";
import { vitest } from "vitest";
import { beforeEach } from "vitest";

// Define a mock object that mimics PrismaClient
const db = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(db);
});

export { db };

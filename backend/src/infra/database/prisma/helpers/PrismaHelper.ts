import { PrismaClient } from '@prisma/client';

export class PrismaHelper {
  private static client: PrismaClient | null = null;

  static async connect(): Promise<void> {
    if (this.client === null) {
			this.client = new PrismaClient();
			this.client.$connect()
    }
  }

  static async disconnect(): Promise<void> {
    if (this.client !== null) {
      await this.client.$disconnect();
      this.client = null;
    }
  }
}

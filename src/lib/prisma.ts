import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

let prisma: PrismaClient

if (!globalForPrisma.prisma) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool)
  prisma = new PrismaClient({ adapter })
} else {
  prisma = globalForPrisma.prisma
}

export { prisma }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

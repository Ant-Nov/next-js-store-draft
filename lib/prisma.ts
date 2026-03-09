import { PrismaClient } from '@prisma/client' // Or your custom output path if defined
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// 1. Setup the Connection Pool using your Transaction URL
const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// 2. Define the Singleton
const prismaClientSingleton = () => {
  return new PrismaClient({ adapter })
}

// 3. Attach to globalThis to prevent connection exhaustion during Next.js dev hot-reloads
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
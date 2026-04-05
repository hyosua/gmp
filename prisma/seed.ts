import 'dotenv/config'
import { PrismaClient, Role } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const password = await bcrypt.hash('gmp', 10)

  const testUsers = [
    { email: 'etudiant@test.com', role: Role.ETUDIANT, nom: 'Doe', prenom: 'John' },
    { email: 'enseignant@test.com', role: Role.ENSEIGNANT, nom: 'Smith', prenom: 'Jane' },
    { email: 'entreprise@test.com', role: Role.ENTREPRISE, nom: 'Corp', prenom: 'Tech' },
    { email: 'admin@test.com', role: Role.ADMIN, nom: 'Admin', prenom: 'Boss' },
  ]

  console.log('--- Initialisation des utilisateurs de test (Prisma 7 Adapter) ---')
  for (const u of testUsers) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { password },
      create: {
        email: u.email,
        password,
        role: u.role,
        nom: u.nom,
        prenom: u.prenom,
      },
    })
    console.log(`Utilisateur créé : ${u.email} (Rôle: ${u.role})`)
  }
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    pool.end()
  })

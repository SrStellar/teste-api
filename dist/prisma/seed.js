import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() { const existingAdmin = await prisma.user.findFirst({ where: { role: 'admin' } }); if (!existingAdmin) {
    const hash = await bcrypt.hash('admin123', 10);
    await prisma.user.create({ data: { name: 'Admin', email: 'admin@padilha.com', passwordHash: hash, role: 'admin' } });
} if ((await prisma.barber.count()) === 0) {
    await prisma.barber.createMany({ data: [{ name: 'Carlos Almeida', specialty: 'Cortes Clássicos', experience: '10 anos', imageUrl: 'https://picsum.photos/200' }, { name: 'João Barbeiro', specialty: 'Degradê', experience: '5 anos', imageUrl: 'https://picsum.photos/201' }] });
} if ((await prisma.serviceCategory.count()) === 0) {
    const cat = await prisma.serviceCategory.create({ data: { name: 'Cabelo' } });
    await prisma.service.createMany({ data: [{ name: 'Corte Tradicional', price: 50.0, categoryId: cat.id }, { name: 'Corte na Tesoura', price: 60.0, categoryId: cat.id }] });
} if ((await prisma.contactInfo.count()) === 0) {
    await prisma.contactInfo.create({ data: { phone: '(11) 98765-4321', email: 'contato@padilhabarbershop.com', address: 'Rua das Navalhas, 123 - Centro, São Paulo - SP', instagram: '#', twitter: '#', facebook: '#' } });
} console.log('Seed concluído.'); }
main().catch(e => { console.error(e); process.exit(1); }).finally(async () => prisma.$disconnect());

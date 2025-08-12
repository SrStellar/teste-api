import bcrypt from 'bcrypt';
import { connectMongoDB, disconnectMongoDB } from '../src/db/mongo';
import { UserModel } from '../src/models/User';
import { BarberModel } from '../src/models/Barber';
import { ServiceCategoryModel } from '../src/models/ServiceCategory';
import { ServiceModel } from '../src/models/Service';
import { ContactInfoModel } from '../src/models/ContactInfo';
import { UserRole } from '../src/models/common';

async function main() {
  await connectMongoDB();

  // Create admin user if not exists
  const existingAdmin = await UserModel.findOne({ role: UserRole.ADMIN });
  if (!existingAdmin) {
    const hash = await bcrypt.hash('admin123', 10);
    await UserModel.create({
      name: 'Admin',
      email: 'admin@padilha.com',
      passwordHash: hash,
      role: UserRole.ADMIN
    });
    console.log('Admin user created');
  }

  // Create barbers if none exist
  const barberCount = await BarberModel.countDocuments();
  if (barberCount === 0) {
    await BarberModel.insertMany([
      {
        name: 'Carlos Almeida',
        specialty: 'Cortes Clássicos',
        experience: '10 anos',
        imageUrl: 'https://picsum.photos/200'
      },
      {
        name: 'João Barbeiro',
        specialty: 'Degradê',
        experience: '5 anos',
        imageUrl: 'https://picsum.photos/201'
      }
    ]);
    console.log('Barbers created');
  }

  // Create service categories and services if none exist
  const categoryCount = await ServiceCategoryModel.countDocuments();
  if (categoryCount === 0) {
    const cat = await ServiceCategoryModel.create({ name: 'Cabelo' });
    await ServiceModel.insertMany([
      {
        name: 'Corte Tradicional',
        price: 50.0,
        categoryId: cat.id
      },
      {
        name: 'Corte na Tesoura',
        price: 60.0,
        categoryId: cat.id
      }
    ]);
    console.log('Service category and services created');
  }

  // Create contact info if not exists
  const contactCount = await ContactInfoModel.countDocuments();
  if (contactCount === 0) {
    await ContactInfoModel.create({
      phone: '(11) 98765-4321',
      email: 'contato@padilhabarbershop.com',
      address: 'Rua das Navalhas, 123 - Centro, São Paulo - SP',
      instagram: '#',
      twitter: '#',
      facebook: '#'
    });
    console.log('Contact info created');
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await disconnectMongoDB();
  });
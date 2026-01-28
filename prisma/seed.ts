import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const rationCategory = await prisma.category.create({
    data: { name: 'Ration' },
  });

  const snacksCategory = await prisma.category.create({
    data: { name: 'Snacks' },
  });

  const beveragesCategory = await prisma.category.create({
    data: { name: 'Beverages' },
  });

  // Create products
  await prisma.product.create({
    data: {
      name: 'Rice (5kg)',
      description: 'High-quality basmati rice, 5kg pack.',
      price: 15.99,
      imageUrl: 'https://images.pexels.com/photos/7249110/pexels-photo-7249110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      categoryId: rationCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Wheat Flour (10kg)',
      description: 'Freshly milled whole wheat flour, 10kg pack.',
      price: 22.50,
      imageUrl: 'https://images.pexels.com/photos/6864817/pexels-photo-6864817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      categoryId: rationCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Potato Chips (Large)',
      description: 'Crispy and salty potato chips.',
      price: 2.49,
      imageUrl: 'https://images.pexels.com/photos/17604100/pexels-photo-17604100/free-photo-of-potato-chips-on-a-wooden-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      categoryId: snacksCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Chocolate Bar',
      description: 'Rich milk chocolate bar.',
      price: 1.25,
      imageUrl: 'https://images.pexels.com/photos/2088528/pexels-photo-2088528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      categoryId: snacksCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Coca-Cola (1.5L)',
      description: 'Refreshing Coca-Cola, 1.5 liter bottle.',
      price: 1.99,
      imageUrl: 'https://images.pexels.com/photos/50593/coca-cola-diet-coke-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      categoryId: beveragesCategory.id,
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

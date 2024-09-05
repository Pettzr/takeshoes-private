const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  // Leia o JSON do arquivo
  const filePath = path.join(__dirname, 'seed2.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const products = JSON.parse(fileData);

  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        variant: {
          create: {
            color: product.variant.color,
            images: product.variant.images,
            price: parseFloat(product.variant.price),
            sizes: {
              create: product.variant.sizes.map(size => ({
                size: size.size,
                quantity: parseInt(size.quantity, 10),
              })),
            },
          },
        },
      },
    });
  }

  console.log('Dados importados com sucesso!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

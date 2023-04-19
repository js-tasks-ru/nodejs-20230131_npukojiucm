const app = require('./app');
const Category = require('./models/Category');
const Product = require('./models/Product');

(async () => {
  await Category.deleteMany();
  await Product.deleteMany();

  const category = await Category.create({
    title: 'Category1',
    subcategories: [{
      title: 'Subcategory1',
    }],
  });

  await Product.create({
    title: 'ProductA',
    description: 'better than ProductB',
    price: 10,
    category: category.id,
    subcategory: category.subcategories[0].id,
    images: ['image1'],
  });

  await Product.create({
    title: 'ProductB',
    description: 'better than ProductA',
    price: 10,
    category: category.id,
    subcategory: category.subcategories[0].id,
    images: ['image1'],
  });

  await Category.syncIndexes();
  await Product.syncIndexes();

  app.listen(3000, () => {
    console.log('App is running on http://localhost:3000');
  });
})();

const Product = require('../models/Product');
const mapProduct = require('../mappers/product');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.query;

  if (subcategory) return next();

  ctx.body = {};
};

module.exports.productList = async function productList(ctx, next) {
  const {subcategory} = ctx.query;
  const product = await Product.find({
    'subcategory': subcategory,
  });

  ctx.body = {products: product.map(
      (product) => mapProduct(product),
  ),
  };
};

module.exports.productById = async function productById(ctx, next) {
  ctx.body = {};
};


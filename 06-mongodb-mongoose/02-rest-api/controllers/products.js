const Product = require('../models/Product');
const mapProduct = require('../mappers/product');
const ObjectId = require('mongoose').Types.ObjectId;

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.query;
  const validator = isValidObjectId(subcategory);
  const product = await Product.find({
    'subcategory': subcategory,
  });

  if (product.length === 0) {
    ctx.status = 404;
    ctx.body = 'Категория не найдена';
    return;
  }

  if (!validator) {
    ctx.status = 400;
    ctx.body = 'Неверный id';
    return;
  }
  ctx.body = {};

  return next();
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


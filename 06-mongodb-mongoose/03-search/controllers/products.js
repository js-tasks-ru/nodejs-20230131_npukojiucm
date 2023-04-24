const Product = require('../models/Product');

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const {query: searchParam} = ctx.query;
  const products = await Product.find({$text: {$search: `${searchParam}`}});

  ctx.body = {
    products: products,
  };
};

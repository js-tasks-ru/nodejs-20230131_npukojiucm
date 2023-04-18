const Order = require('../models/Order');
const sendMail = require('../libs/sendMail');

module.exports.checkout = async function checkout(ctx, next) {
  if (!ctx.user) {
    ctx.status = 401;
  }

  const {product, phone, address} = ctx.query;

  const order = new Order({
    user: ctx.user['_id'],
    product: product,
    phone: phone,
    address: address,
  });
  await order.save();

  const mail = {
    template: 'order-confirmation',
    locals: {
      id: order['_id'],
      product: await order.populate('product')
          .then((order) => order.product.title),
    },
    to: ctx.user['email'],
    subject: 'Подтвердите почту',
  };
  await sendMail(mail);

  ctx.body = {
    order: order['_id'],
  };
};

module.exports.getOrdersList = async function ordersList(ctx, next) {
  if (ctx.user) {
    const orders = await Order.find({user: ctx.user['_id']});
  }
};

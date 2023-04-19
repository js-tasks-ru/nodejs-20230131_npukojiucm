const Order = require('../models/Order');
const sendMail = require('../libs/sendMail');
const mapOrder = require('../mappers/order');

module.exports.checkout = async function checkout(ctx, next) {
  if (!ctx.user) {
    ctx.status = 401;
    return;
  }

  const {product, phone, address} = ctx.request.body;

  const order = await Order.create({
    user: ctx.user.id,
    product: product,
    phone: phone,
    address: address,
  });

  const mail = {
    template: 'order-confirmation',
    locals: {
      id: order.id,
      product: order.product,
    },
    to: ctx.user.email,
    subject: 'Подтвердите почту',
  };
  await sendMail(mail);

  ctx.body = {
    order: order.id,
  };
};

module.exports.getOrdersList = async function ordersList(ctx, next) {
  if (!ctx.user) {
    ctx.status = 401;
    return;
  }

  const orders = await Order.find({
    user: ctx.user.id,
  }).populate('product');

  ctx.body = {
    orders: orders.map((order) => mapOrder(order)),
  };
};

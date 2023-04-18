const Order = require('../models/Order');
const sendMail = require('../libs/sendMail');

module.exports.checkout = async function checkout(ctx, next) {
  const {product, phone, address} = ctx.query;

  if (ctx.user) {
    const order = new Order({
      user: ctx.user['_id'],
      product: product,
      phone: phone,
      address: address,
    });
    await order.save();

    console.log(ctx.user['email']);

    await sendMail({
      template: 'order-confirmation',
      locals: {
        id: ctx.user['_id'],
        product: await order.populate('product')
            .then((order) => order.product.title),
      },
      to: ctx.user['email'],
      subject: 'Подтвердите почту',
    });

    ctx.body = {
      order: order['_id'],
    };
  } else {
    ctx.status = 401;
  }
};

module.exports.getOrdersList = async function ordersList(ctx, next) {
  if (ctx.user) {
    const orders = await Order.find({user: ctx.user['_id']});
  }
};

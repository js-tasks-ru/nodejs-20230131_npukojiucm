const Message = require('../models/Message');
const messageMapper = require('../mappers/message');

module.exports.messageList = async function messages(ctx, next) {
  if (!ctx.user) {
    throw {
      status: 401,
      message: 'Пользователь не залогинен',
    };
  }

  const userID = ctx.user.id;
  const messages = await Message.find({chat: userID});

  ctx.body = {
    messages: messages.map(messageMapper),
  };
};

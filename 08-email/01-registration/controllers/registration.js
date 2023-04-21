const { v4: uuid } = require('uuid');
const User = require('../models/User');
const sendMail = require('../libs/sendMail');

module.exports.register = async (ctx, next) => {
  const token = uuid();

  const {email, displayName, password} = ctx.request.body;

  const newUser = await User.create({
    
  })

};

module.exports.confirm = async (ctx, next) => {

};

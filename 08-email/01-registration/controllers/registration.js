const {v4: uuid} = require('uuid');
const User = require('../models/User');
const Session = require('../models/Session');
const sendMail = require('../libs/sendMail');

module.exports.register = async (ctx, next) => {
  // await User.deleteMany();
  // await Session.deleteMany();
  const token = uuid();

  const {email, displayName, password} = ctx.request.body;

  if (await User.findOne({email}) !== null) {
    throw {
      status: 400,
      message: {
        email: 'Такой email уже существует',
      },
    };
  }

  const newUser = await new User({
    email,
    displayName,
    verificationToken: token,
  });
  await newUser.setPassword(password);
  await newUser.save();

  await sendMail({
    template: 'confirmation',
    locals: {token: `${token}`},
    to: newUser.email,
    subject: 'Подтвердите почту',
  });

  ctx.body = {status: 'ok'};
};

module.exports.confirm = async (ctx, next) => {
  const {verificationToken} = ctx.request.body;

  const user = await User.findOneAndUpdate({
    verificationToken,
  },
  {
    $unset:
        {
          verificationToken: '',
        },
  });

  if (user === null) {
    throw {
      status: 400,
      message: 'Ссылка подтверждения недействительна или устарела',
    };
  }

  const sessionToken = uuid();
  await Session.create({
    token: sessionToken,
    lastVisit: new Date(),
    user: user.id,
  });

  ctx.body = {
    token: '',
  };
};

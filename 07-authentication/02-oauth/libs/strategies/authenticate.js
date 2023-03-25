const User = require('../../models/User');

module.exports = function authenticate(strategy, email, displayName, done) {
  if (email) return done(null, false, 'Забыли передать почту?');
  
  User.findOne({email: email}, async function (err, user) {
    if (!user) return done(null, false, 'Пользователь не найден');

    return done(null, user, 'Все ок');
  })
  
};

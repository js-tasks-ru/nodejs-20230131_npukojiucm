const User = require('../../models/User');

module.exports = function authenticate(strategy, email, displayName, done) {
  if (!email) return done(null, false, 'Не указан email');

  User.findOne({email: email}, async function (err, user) {
    if (!user) {
      const newUser = new User({email: email, displayName: displayName});
      if (err) return done(err, false);
    }

    return done(null, user, 'Все ок');
  })
  
};

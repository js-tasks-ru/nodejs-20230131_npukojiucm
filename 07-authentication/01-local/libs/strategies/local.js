const User = require('../../models/User');

const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
    {usernameField: 'email', session: false},
    function(email, password, done) {
      const user = await User.findOne({'email': email});
      
      if (!user) {
        return done(null, null, 'Нет такого пользователя');
      }

      const isValidPass = await new User(user).checkPassword(password);
      if (isValidPass) {
        return done(null, user);
      }
      return done(null, null, 'Неверный пароль');
    },
);

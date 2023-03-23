const User = require('../../models/User');

const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
    {usernameField: 'email', session: false},
    function(email, password, done) {
      const user = User.findOne({
        email: email,
      })

      if (!user) {
        return done(null, null, 'Нет такого пользователя');
      }
      done(null, false, 'Стратегия подключена, но еще не настроена');
    },
);
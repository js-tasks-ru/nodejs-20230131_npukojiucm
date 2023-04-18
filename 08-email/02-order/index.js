const app = require('./app');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Order = require('./models/Order');
const mongoose = require('mongoose');
const User = require('./models/User');
const Session = require('./models/Session');
const ObjectId = mongoose.Types.ObjectId;

// async function createUserAndSession(userData, token) {
//   const user = new User(userData);
//   await user.setPassword(userData.password);
//   await user.save();
//   await Session.create({token, user, lastVisit: new Date()});
//   return user;
// }
//
// (async () => {
//   await mongoose.connect('mongodb://127.0.0.1:27017/any-shop');
//   await User.deleteMany();
//   await Session.deleteMany();
//   await Category.deleteMany();
//   await Product.deleteMany();
//   await Order.deleteMany();
//
//   const userData = {
//     email: 'a.platcev@yandex.ru',
//     displayName: 'user',
//     password: '123123',
//   };
//
//   const token = 'token';
//   const user = await createUserAndSession(userData, token);
//
//   const categories = [
//     {
//       '_id': ObjectId('5d2f7e66a5a47618d7080a0f'),
//       'title': 'Детские товары и игрушки',
//       'subcategories': [
//         {
//           '_id': ObjectId('5d2f7e66a5a47618d7080a15'),
//           'title': 'Прогулки и детская комната',
//         },
//       ],
//     },
//   ];
//   await Category.insertMany(categories);
//
//   const products = [
//     {
//       // eslint-disable-next-line new-cap
//       '_id': ObjectId('5d2f7e66a5a47618d7080a1f'),
//       'title': 'Коляска Adamex Barletta 2 in 1',
//       'description': 'description',
//       'category': categories[0]._id,
//       'subcategory': categories[0].subcategories[0]._id,
//       'images': [
//         'http://magazilla.ru/jpg_zoom1/598194.jpg',
//       ],
//       'price': 21230,
//     },
//   ];
//   await Product.insertMany(products);
//
//   await app.listen(3000, () => {
//     console.log('App is running on http://localhost:3000');
//   });
// })();

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
});

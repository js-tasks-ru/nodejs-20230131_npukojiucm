const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

const message = [];
router.get('/subscribe', async (ctx, next) => {
  await new Promise(resolve => {
    if (message.length > 1) {
      ctx.body = message[message.length - 1];
      mes = message[0];
      ctx.body = mes;
      message.splice(0, 1);
      resolve();
    }

    resolve();
  });
});

router.post('/publish', async (ctx, next) => {
  message.push(ctx.request.body.message);
});

app.use(router.routes());

module.exports = app;

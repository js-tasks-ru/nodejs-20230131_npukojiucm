const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

const clients = [];

router.get('/subscribe', async (ctx, next) => {
  const body = await new Promise(resolve => clients.push(resolve));
  ctx.body = body;
  
});

router.post('/publish',
    async (ctx, next) => {
      const message = ctx.request.body.message;

      if (!message) {
        return;
      }

      clients.forEach(client => {
        client(message);
      });

      ctx.res.statusCode = 201;

      clients.length = 0;
    });

app.use(router.routes());

module.exports = app;

const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
require('./utils');

const app = new Koa();

// log request URL
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`.blue);
    await next();
});

app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`Time: ${ms}ms\r\n`.green);
});

// add url-route
router.get('/hello/:name', async (ctx, next) => {
    let name = ctx.params.name;
    ctx.response.type = 'text/html';
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});


app.use(bodyParser());

// add router middleware
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
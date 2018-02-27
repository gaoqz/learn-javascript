const Koa = require('koa');
const route = require('koa-router')();
const app = new Koa();

const about = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
};

const main = ctx => {
    ctx.response.body = 'hello koa!';
};

route.get('/', main);
route.get('/about', about);

app.use(route.routes());

app.listen(3000);
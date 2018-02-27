let fn_index = async(ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="" placeholder="请输入用户名"></p>
            <p>Password: <input name="password" type="password" placeholder="请输入密码"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

let fn_signin = async(ctx, next) => {
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>welcome, ${name}!</h1>`;
    } else {
        console.log(`signin error!`.bgRed);
        ctx.response.body = `<h1>Login failed</h1>
            <p><a ref="/">Try again</a></p>`;
    }
};

module.exports = [
    {
        method: 'GET',
        path: '/',
        func: fn_index
    },
    {
        method: 'POST',
        path: '/signin',
        func: fn_signin
    }
];
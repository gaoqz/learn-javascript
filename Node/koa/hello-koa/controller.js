const fs = require('fs');

function addMapping(router, mapping) {
    for(let req of mapping) {
        if (req.method === 'GET') {
            console.log(`${req.method}`.blue,`${req.path}`);
            router.get(req.path, req.func);
            console.log(`register URL mapping: GET ${req.path}`);
        } else if (req.method === 'POST') {
            console.log(`${req.method}`.yellow,`${req.path}`);
            router.post(req.path, req.func);
            console.log(`register URL mapping: POST ${req.path}`);
        } else if (req.method === 'PUT') {
            console.log(`${req.method}`.yellow,`${req.path}`);
            router.put(req.path, req.func);
            console.log(`register URL mapping: PUT ${req.path}`);
        } else if (req.method === 'DELETE') {
            console.log(`${req.method}`.red,`${req.path}`);
            router.del(req.path, req.func);
            console.log(`register URL mapping: DELETE ${req.path}`);
        } else {
            console.log(`invalid url: ${req.url}`.bgRed);
        }
    }
}

function addControllers(router) {
    let files = fs.readdirSync(__dirname + '/controllers');
    let js_files = files.filter( f => f.endsWith('.js'));

    for (let f of js_files) {
        console.log(`process controllers: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
    console.log('process controllers end! \n\r');
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers', //如果不传参数。扫描目录默认为'controllers'
        router = require('koa-router')();
    
    addControllers(router, controllers_dir);
    return router.routes();
}
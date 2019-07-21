const koa =  require('koa');
const router = require('./src/router');
const koaBody = require('koa-body')(({ multipart: true}))

const cors = require('koa-cors');

const app = new koa();

app.use(koaBody)

function allowOrigin(req){
    return req.accept.headers.origin;
}

app.use(cors({
    origin: allowOrigin,
}));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, ( error, response) => {
    console.log('Server started on port 3000');
})


// fetch all the db details

// connect to mongodb
// create collection with the same name as mysql table
// write to mongodb
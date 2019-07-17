const Router = require('koa-router');
const mySqlHandler = require('./mysql/handler');
const router = new Router({ prefix: '/' });

router.post('mysql/createConnection', mySqlHandler.createConnection);
router.get('mysql/getTables', mySqlHandler.getTables);

module.exports = router;
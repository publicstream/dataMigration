const Router = require('koa-router');
const { wrapHandlerModule } = require('./requestResponseWrapper');
const mySqlHandler = wrapHandlerModule(require('./mysql/handler'));
const router = new Router({ prefix: '/' });

router.post('mysql/createConnection', mySqlHandler.createConnection) ;
router.get('mysql/getTables', mySqlHandler.getTables);
router.get('mysql/getColumns/:table', mySqlHandler.getColumns);

module.exports = router;
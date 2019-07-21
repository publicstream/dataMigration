const Router = require('koa-router');
const { wrapHandlerModule } = require('./requestResponseWrapper');
const mySqlHandler = wrapHandlerModule(require('./mysql/handler'));
const mongoDbHandler = wrapHandlerModule(require('./mongodb/handler'));
const handler = wrapHandlerModule(require('./handler'));
const router = new Router({ prefix: '/' });

router.post('mysql/createConnection', mySqlHandler.createConnection) ;
router.get('mysql/getTables', mySqlHandler.getTables);
router.get('mysql/getColumns/:table', mySqlHandler.getColumns);
router.get('mysql/randomDataInsertion', mySqlHandler.randomDataInsertion);

router.post('mongodb/createConnection', mongoDbHandler.createConnection);
router.post('mongodb/createSchema', mongoDbHandler.createSchema);
router.post('mongodb/randomDataInsertion', mongoDbHandler.randomDataInsertion);

router.post('port', handler.portData)

module.exports = router;
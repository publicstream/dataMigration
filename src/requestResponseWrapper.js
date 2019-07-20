function wrapHandlerModule(module){
    let moduleArr = Object.entries(module);
    let updatedFuncArr = moduleArr.map(([name, func]) => {
        return {[name]: wrapHandler(func)}
    })

    return updatedFuncArr.reduce((acc, item) => {
        acc = { ...acc, ...item}
        return acc
    }, {})
}

function wrapHandler(handler) {
    return async (ctx) => {
        try {
            let requestMethod = ctx.request.method;
            let body = ctx.request.body;
            const response = requestMethod === 'POST' ? await handler(body, ctx) : await handler(ctx);
            console.log(response)
            for( var key in response) {
                ctx[key] = response[key];
            }
        } catch(error) {
            console.log('error', error);
        }
    }
}

function OK(response) {
    return {
        status: 200,
        body: response ? response : null
    }
}

module.exports = {
    OK,
    wrapHandlerModule
}
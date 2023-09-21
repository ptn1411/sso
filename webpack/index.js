module.exports = (env) => {
    process.env.BACKEND_BASE_URL = 'http://serversso.test'
    process.env.PORT = 3002
    process.env.REDIS_HOST = '127.0.0.1'
    if (typeof env !== 'undefined' && env === 'development') {
        process.env.NODE_ENV = 'development'
        return [require('./webpack.client.dev'), require('./webpack.server.dev')]
    }
    process.env.NODE_ENV = 'production'
    return [require('./webpack.client.prod'), require('./webpack.server.prod')]
}

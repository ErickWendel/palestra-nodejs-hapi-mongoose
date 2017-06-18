const Hapi = require('hapi')
const server = new Hapi.Server()
server.connection({port: 4000})
server.route({
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
        return reply('Hello Hapi!!')
    }
})
server.start(() => {
    console.log('running at 4000')
})
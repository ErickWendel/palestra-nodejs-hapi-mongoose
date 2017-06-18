const Hapi = require('hapi')
const Joi = require('joi')
const server = new Hapi.Server()
server.connection({port: 4000})
server.route({
    path: '/',
    method: 'POST',
    config: {
        validate: {
            payload: {
                nome: Joi.string().required(),
                idade: Joi.number().required()
            }
        },
        handler: (req, reply) => {
            return reply(`Hello ${req.payload.nome} - ${req.payload.idade} anos!!`)
        }

    }
})
server.start(() => {
    console.log('running at 4000 joi')
})
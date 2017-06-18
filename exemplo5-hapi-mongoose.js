const Hapi = require('hapi')
const Joi = require('joi')
const server = new Hapi.Server()
server.connection({port: 4000})

const Mongoose = require('mongoose')
Mongoose.connect('mongodb://localhost/eventos')
const Db = Mongoose.connection;
Db.once('open', () => console.log('mongo conectado'))

const palestranteSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    }
})

const palestranteModel = Mongoose.model('palestrante', palestranteSchema)
 

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
        handler: async(req, reply) => {
            const palestrante = new palestranteModel({
                nome: req.payload.nome,
                idade: req.payload.idade
            })
            await palestrante.save()
            return reply(await palestranteModel.find({}, { __v: 0 }))
        }

    }
})
server.start(() => {
    console.log('running at 4000 todos exemplos juntos')
})
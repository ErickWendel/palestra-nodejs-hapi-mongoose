const Mongoose = require('mongoose')
Mongoose.connect('mongodb://localhost/eventos')
const Db = Mongoose.connection;
Db.once('open', () => {
    console.log('mongo conectado')
})

const PalestranteSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    }
})

const model = Mongoose.model('palestrante', PalestranteSchema)
async function run() {
    const palestrante = new model({
        nome: `Erick  ${new Date().getTime()}`,
        idade: 22
    })

    try {
        await palestrante.save()
        const items = await model.find({}, { __v: 0 })
        console.log('items', items)
        await model.remove()
    }
    catch (error) {
        console.error('deu ruim', error)
    }
}
run()


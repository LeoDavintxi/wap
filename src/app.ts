import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from '@bot-whatsapp/bot'
import {BaileysProvider, handleCtx} from '@bot-whatsapp/provider-baileys'

const flowBienvenida = addKeyword('hola').addAnswer('Buenas.... Bienvenido')
const flowDespedida = addKeyword('chao').addAnswer('hasta la vista baby')

const main = async () => {
    const provider = createProvider(BaileysProvider)
    
    provider.initHttpServer(3002)
    provider.http?.server.post('/send-message', handleCtx( async(bot, req, res) => {
        console.log(req.body)
        const body = req.body
        const message = body.message
        await bot.sendMessage('573103381304', message, {})
        res.end('mensaje enviado')
    }))
    
    await createBot({
        flow: createFlow([flowBienvenida, flowDespedida]),
        database: new MemoryDB(),
        provider
    })
}

main()
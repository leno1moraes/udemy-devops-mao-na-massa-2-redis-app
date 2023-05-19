const express = require('express')
const redis = require('redis')

const app = express()
const client = redis.createClient({
    host: 'redis-server',
    port: '6379'
})

client.set('visits', 0)

app.get('/', (req, res)=>{
    client.get('visits', (err, visits)=>{
        visits = parseInt(visits) + 1
        res.send('Número de visitas é: ' + visits)
        client.sent('visits', parseInt(visits))
    })
})

app.listen(8001, ()=>{
    console.log('Serviço na porta 8001')
})
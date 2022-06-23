const express = require('express')
const rota = express.Router();

const consultaBD = require('../banco_de_dados/comando_bd/nota_comando')

var pg = require('pg')
var conString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

rota.get('/:iddisc', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('operação não permitida')
        }
        client.query(consultaBD.getAll, [req.params.iddisc], (error, result) => {
            if (error) {
                release()
                return res.status(401).send('Operação não autorizada')
            }
            res.status(200).send(result.rows)
            release()
        })
    })
});

rota.post('/', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Conexao não autorizada')
        }
        client.query(consultaBD.postOne, [req.body.descricao, req.body.nota, req.body.iddisc], (error, result) => {
            if (error) {
                release()
                return res.status(401).send('Operação não permitida')
            }
            res.status(201).send("Nota cadastrada")
            release()
        })
    })
});

rota.delete('/:id', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Não foi')
        }
        client.query(consultaBD.deleteOne, [req.params.id], (error, result) => {
            if (error) {
                release()
                return res.status(401).send('Não funcionou')
            }
            res.status(200).send('Nota deletada com sucesso!')
            release()
        })
    })
});

module.exports = rota;
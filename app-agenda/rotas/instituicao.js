const express = require('express')
const rota = express.Router();

const consultaBD = require('../banco_de_dados/comando_bd/instituicao_comando')

var pg = require('pg')
var conString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

rota.post('/get', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('operação não permitida')
        }
        client.query(consultaBD.getAll, [req.body.id], (erro, result) => {
            if (erro) {
                release()
                return res.status(401).send('Operação não autorizada')
            }
            res.status(200).send(result.rows)
        })
    })
})

rota.get('/:id', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('operação não permitida')
        }
        client.query(consultaBD.getOne, [req.params.id], (erro, result) => {
            if (erro) {
                release()
                return res.status(401).send({ erro: err.message })
            }
            res.status(200).send(result.rows[0])
            release()
        })
    })
})

rota.post('/', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Conexao não autorizada', err.rows)
        }
        client.query(consultaBD.postOne, [req.body.nome, req.body.sigla, req.body.cep, req.body.rua, req.body.cidade, req.body.estado, req.body.idaluno], (error, result) => {
            if (error) {
                release()
                return res.status(401).send('Operação não permitida')
            }
            res.status(201).send("Insituicao cadastrada")
            release()
        })
    })
})

rota.put('/:id', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Conexão não autorizada')
        }
        client.query(consultaBD.getOne, [req.params.id], (erro, resul) => {
            if (erro) {
                release()
                return res.status(401).send('Operação não permitida')
            }
            if (resul.rowCount > 0) {
                var values = [req.body.nome, req.body.sigla, req.body.cep, req.body.rua, req.body.cidade, req.body.estado, req.params.id]
                client.query(consultaBD.putAll, values, (error, result) => {
                    if (error) {
                        release()
                        return res.status(401).send('Operação não permitida')
                    }
                    res.status(201).send(result.rows[0])
                    release()
                })
            } else {
                release()
                res.status(401).send('Operação não permitida')
            }
        })
    })
});

rota.delete('/:id', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Operação não permitida')
        }
        client.query(consultaBD.deleteOne, [req.params.id], (error, result) => {
            if (error) {
                release()
                return res.status(401).send('Não funcionou')
            }
            res.status(200).send('Instituicao deletada com sucesso!')
            release()
        })
    })
})

module.exports = rota;
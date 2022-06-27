const express = require('express')
const rota = express.Router();

const consultaBD = require('../banco_de_dados/comando_bd/nota_comando')
const mensagem = require('../mensagens/mensagem')

var pg = require('pg')
var conString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

rota.get('/:iddisc', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        client.query(consultaBD.getAll, [req.params.iddisc], (error, result) => {
            if (error) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
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
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        client.query(consultaBD.postOne, [req.body.descricao, req.body.nota, req.body.iddisc], (error, result) => {
            if (error) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }
            res.status(201).send(result.rows)
            release()
        })
    })
});

rota.delete('/:id', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        client.query(consultaBD.deleteOne, [req.params.id], (error, result) => {
            if (error) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }
            res.status(200).send(mensagem.SUCESSO_OPERACAO)
            release()
        })
    })
});

module.exports = rota;
const express = require('express')
const rota = express.Router()

const consultaBD = require('../banco_de_dados/comando_bd/disciplina_comando')
const mensagem = require('../mensagens/mensagem')

var pg = require('pg')
var conString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

rota.post('/get', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        client.query(consultaBD.getAll,[req.body.id], (erro, result) => {
            if (erro) {
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
        client.query(consultaBD.postOne, [req.body.nome, req.body.abreviacao, req.body.docente, req.body.anotacao, req.body.idaluno, req.body.idinst], (error, result) => {
            if (error) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }
            res.status(201).send(result.rows)
            release()
        })
    })
});

rota.get('/:id', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        client.query(consultaBD.getOne, [req.params.id], (error, result) => {
            if (error) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }
            res.status(200).send(result.rows[0])
            release()
        })
    })
});

rota.put('/:id', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        client.query(consultaBD.getOne, [req.params.id], (erro, resul) => {
            if (erro) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }
            if (resul.rowCount > 0) {
                var values = [req.body.nome, req.body.abreviacao, req.body.docente, req.body.anotacao, req.body.idinst, req.params.id]
                client.query(consultaBD.putAll, values, (error, result) => {
                    if (error) {
                        release()
                        return res.status(401).send(mensagem.ERRO_OPERACAO)
                    }
                    res.status(201).send(result.rows[0])
                    release()
                })
            } else {
                res.status(401).send(mensagem.ERRO_OPERACAO)
                release()
            }
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
})

module.exports = rota;
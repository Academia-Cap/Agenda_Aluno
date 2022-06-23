const express = require('express')
const rota = express.Router();
const bcrypt = require('bcrypt')

const consultaBD = require('../banco_de_dados/comando_bd/aluno_comando')
const mensagem = require('../mensagens/mensagem')

var pg = require('pg')
var conString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

rota.post('/', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }

        client.query(consultaBD.getEmail, [req.body.email], (erro, result) => {
            if (erro) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }

            if (result.rowCount > 0) {
                release()
                return res.status(200).send(mensagem.ERRO_REGISTRO)
            }
            bcrypt.hash(req.body.senha, 10, (error, hash) => {
                if (error) {
                    release()
                    return res.status(500).send(mensagem.ERRO_AUNTENTICACAO)
                }
                var values = [req.body.nome, req.body.telefone, req.body.email, req.body.usuario, hash]
                client.query(consultaBD.postOne, values, (error, result) => {
                    if (error) {
                        return res.status(401).send(mensagem.ERRO_OPERACAO)
                    }
                    res.status(201).send(result.rows[0])
                    release()
                })
            })
        })
    })
});

rota.get('/:idAluno', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        var values = [req.params.idAluno]
        client.query(consultaBD.getOne, values, (error, result) => {
            if (error) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }
            res.status(201).send(result.rows[0])
            release()
        })
    })
});

rota.put('/:idAluno', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        client.query(consultaBD.getOne, [req.params.idAluno], (erro, resul) => {
            if (erro) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }
            if (resul.rowCount > 0) {
                var values = [req.body.nome, req.body.telefone, req.body.usuario, req.params.idAluno]
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

rota.delete('/:idAluno', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        client.query(consultaBD.getOne, [req.params.idAluno], (erro, resul) => {
            if (erro) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }
            if (resul.rowCount > 0) {
                client.query(consultaBD.deleteOne, [req.params.idAluno], (error, result) => {
                    if (error) {
                        release()
                        return res.status(401).send(mensagem.ERRO_OPERACAO)
                    }
                    res.status(201).send(mensagem.SUCESSO_OPERACAO)
                    release()
                })
            } else {
                res.status(401).send(mensagem.ERRO_OPERACAO)
                release()
            }
        })

    })
});


rota.put('/alterarSenha/:id', (req, res, release) => {
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
            bcrypt.compare(req.body.senhaAntiga, result.rows[0].senha, (error, results) => {
                if (error) {
                    release()
                    return res.status(401).send(mensagem.ERRO_AUNTENTICACAO)
                }
                bcrypt.hash(req.body.novaSenha, 10, (error, hash) => {
                    if (error) {
                        release()
                        return res.status(500).send(mensagem.ERRO_AUNTENTICACAO)
                    }
                    client.query(consultaBD.putPassword, [hash, req.params.id], (error, result) => {
                        if (error) {
                            return res.status(401).send(mensagem.ERRO_OPERACAO)
                        }
                        res.status(201).send(result.rows[0])
                        release()
                    })
                })
            })
        })
    })
})

module.exports = rota;
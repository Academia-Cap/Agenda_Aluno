const express = require('express')
const rota = express.Router();
const bcrypt = require('bcrypt')

const consultaBD = require('../banco_de_dados/comando_bd/aluno_comando')

var pg = require('pg')
var conString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

rota.get('/', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Conexão não autorizada')
        }
        res.status(200).send('Conectado com sucesso')
        release()
    })
});

rota.post('/', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Conexão não autorizada')
        }

        client.query(consultaBD.getEmail, [req.body.email], (erro, result) => {
            if (erro) {
                release()
                return res.status(401).send('Operação não autorizada')
            }

            if (result.rowCount > 0) {
                release()
                return res.status(200).send('Resgistro já existe')
            }
            bcrypt.hash(req.body.senha, 10, (error, hash) => {
                if (error) {
                    release()
                    return res.status(500).send({
                        message: 'erro de autenticação',
                        erro: error.message
                    })
                }
                var values = [req.body.nome, req.body.telefone, req.body.email, req.body.usuario, hash]
                client.query(consultaBD.postOne, values, (error, result) => {
                    if (error) {
                        return res.status(401).send('Operação não permitida')
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
            return res.status(401).send('Conexão não autorizada')
        }
        var values = [req.params.idAluno]
        client.query(consultaBD.getOne, values, (error, result) => {
            if (error) {
                release()
                return res.status(401).send('Operação não permitida')
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
            return res.status(401).send('Conexão não autorizada')
        }
        client.query(consultaBD.getOne, [req.params.idAluno], (erro, resul) => {
            if (erro) {
                release()
                return res.status(401).send('Operação não permitida')
            }
            if (resul.rowCount > 0) {
                var values = [req.body.nome, req.body.telefone, req.body.usuario, req.params.idAluno]
                client.query(consultaBD.putAll, values, (error, result) => {
                    if (error) {
                        release()
                        return res.status(401).send('Operação não permitida')
                    }
                    res.status(201).send(result.rows[0])
                    release()
                })
            } else {
                res.status(401).send('Operação não permitida')
                release()
            }
        })
    })
});

rota.delete('/:idAluno', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Conexão não autorizada')
        }
        client.query(consultaBD.getOne, [req.params.idAluno], (erro, resul) => {
            if (erro) {
                release()
                return res.status(401).send('Operação não permitida')
            }
            if (resul.rowCount > 0) {
                client.query(consultaBD.deleteOne, [req.params.idAluno], (error, result) => {
                    if (error) {
                        release()
                        return res.status(401).send('Operação não permitida')
                    }
                    res.status(201).send('Operação realizada com sucesso')
                    release()
                })
            } else {
                res.status(401).send('Operação não permitida')
                release()
            }
        })

    })
});


rota.put('/alterarSenha/:id', (req, res, release) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send("Conexão não autorizada")
        }
        client.query(consultaBD.getOne, [req.params.id], (error, result) => {
            if (error) {
                release()
                return res.status(401).send('operação não permitida')
            }
            bcrypt.compare(req.body.senhaAntiga, result.rows[0].senha, (error, results) => {
                if (error) {
                    release()
                    return res.status(401).send({
                        message: "Falha na autenticação"
                    })
                }
                bcrypt.hash(req.body.novaSenha, 10, (error, hash) => {
                    if (error) {
                        release()
                        return res.status(500).send({
                            message: 'erro de autenticação',
                            erro: error.message
                        })
                    }
                    client.query(consultaBD.putPassword, [hash, req.params.id], (error, result) => {
                        if (error) {
                            return res.status(401).send('Operação não permitida')
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
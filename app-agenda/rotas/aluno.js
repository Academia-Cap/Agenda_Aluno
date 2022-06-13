const express = require('express')
const rota = express.Router();

const bcrypt = require('bcrypt')

var pg = require('pg')
var conString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

rota.get('/', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Conexão não autorizada')
        }
        res.status(200).send('Conectado com sucesso')
    })
});

rota.post('/', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Conexão não autorizada')
        }

        client.query('select * from aluno where usuario = $1', [req.body.usuario], (erro, result) => {
            if (erro) {
                return res.status(401).send('Operação não autorizada')
            }

            if (result.rowCount > 0) {
                return res.status(200).send('Resgistro já existe')
            }
            bcrypt.hash(req.body.senha, 10, (error, hash) => {
                if (error) {
                    return res.status(500).send({
                        message: 'erro de autenticação',
                        erro: error.message
                    })
                }

                var sql = 'INSERT INTO aluno(nome, telefone, email, usuario, senha) VALUES($1,$2,$3,$4,$5)'
                var values = [req.body.nome, req.body.telefone, req.body.email, req.body.usuario, hash]
                client.query(sql, values, (error, result) => {
                    if (error) {
                        return res.status(401).send('Operação não permitida')
                    }
                    res.status(201).send(result.rows[0])
                })
            })
        })

    })
});

rota.get('/:idAluno', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Conexão não autorizada')
        }
        var sql = 'SELECT * FROM aluno WHERE id = $1'
        var values = [req.params.idAluno]
        client.query(sql, values, (error, result) => {
            if (error) {
                return res.status(401).send('Operação não permitida')
            }
            res.status(201).send(result.rows[0])
        })
    })
});

rota.put('/:idAluno', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Conexão não autorizada')
        }
        client.query('SELECT * FROM aluno WHERE id = $1', [req.params.idAluno], (erro, resul) => {
            if (erro) {
                return res.status(401).send('Operação não permitida')
            }
            if (resul.rowCount > 0) {
                var sql = 'UPDATE aluno SET nome = $1, telefone = $2, usuario = $3 WHERE id = $4'
                var values = [req.body.nome, req.body.telefone, req.body.usuario, req.params.idAluno]
                client.query(sql, values, (error, result) => {
                    if (error) {
                        return res.status(401).send('Operação não permitida')
                    }
                    res.status(201).send(result.rows[0])
                })
            } else {
                res.status(401).send('Operação não permitida')
            }
        })
        
    })
});

rota.delete('/:idAluno', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Conexão não autorizada')
        }
        client.query('SELECT * FROM aluno WHERE id = $1', [req.params.idAluno], (erro, resul) => {
            if (erro) {
                return res.status(401).send('Operação não permitida')
            }
            if (resul.rowCount > 0) {
                client.query('DELETE FROM aluno WHERE id = $1', [req.params.idAluno], (error, result) => {
                    if (error) {
                        return res.status(401).send('Operação não permitida')
                    }
                    res.status(201).send('Operação realizada com sucesso')
                })
            } else {
                res.status(401).send('Operação não permitida')
            }
        })

    })
});

module.exports = rota;
const express = require('express')
const rota = express.Router();
const bcrypt = require('bcrypt')

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

        client.query('select * from aluno where email = $1', [req.body.email], (erro, result) => {
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

                var sql = 'INSERT INTO aluno(nome, telefone, email, usuario, senha) VALUES($1,$2,$3,$4,$5)'
                var values = [req.body.nome, req.body.telefone, req.body.email, req.body.usuario, hash]
                client.query(sql, values, (error, result) => {
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
        var sql = 'SELECT * FROM aluno WHERE id = $1'
        var values = [req.params.idAluno]
        client.query(sql, values, (error, result) => {
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
        client.query('SELECT * FROM aluno WHERE id = $1', [req.params.idAluno], (erro, resul) => {
            if (erro) {
                release()
                return res.status(401).send('Operação não permitida')
            }
            if (resul.rowCount > 0) {
                var sql = 'UPDATE aluno SET nome = $1, telefone = $2, usuario = $3 WHERE id = $4'
                var values = [req.body.nome, req.body.telefone, req.body.usuario, req.params.idAluno]
                client.query(sql, values, (error, result) => {
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
        client.query('SELECT * FROM aluno WHERE id = $1', [req.params.idAluno], (erro, resul) => {
            if (erro) {
                release()
                return res.status(401).send('Operação não permitida')
            }
            if (resul.rowCount > 0) {
                client.query('DELETE FROM aluno WHERE id = $1', [req.params.idAluno], (error, result) => {
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
        client.query('select * from aluno where id = $1', [req.params.id], (error, result) => {
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
                    client.query('UPDATE aluno SET senha = $1 WHERE id = $2', [hash, req.params.id], (error, result) => {
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

rota.put('/addAvatar/:idAluno', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Conexão não autorizada')
        }
        client.query('SELECT * FROM aluno WHERE id = $1', [req.params.idAluno], (erro, resul) => {
            if (erro) {
                release()
                return res.status(401).send('Operação não permitida')
            }
            if (resul.rowCount > 0) {
                var sql = 'UPDATE aluno SET idAvatar=$1 WHERE id = $2'
                var values = [req.body.idAvatar, req.params.idAluno]
                client.query(sql, values, (error, result) => {
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

rota.get('/viewAvatar/:idAluno', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Conexão não autorizada')
        }
        var sql = 'SELECT idAvatar FROM aluno WHERE id = $1'
        var values = [req.params.idAluno]
        client.query(sql, values, (error, result) => {
            if (error) {
                release()
                return res.status(401).send('Operação não permitida')
            }
            res.status(201).send(result.rows[0])
            release()
        })
    })
});

module.exports = rota;
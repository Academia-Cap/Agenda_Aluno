const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

var pg = require('pg')
var conString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

app.get('/', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Conexão não autorizada')
        }
        res.status(200).send('Conectado com sucesso')
    })
})

app.post('/aluno', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Conexão não autorizada')
        }
        var sql = 'INSERT INTO aluno(nome, telefone, email, usuario, senha) VALUES($1,$2,$3,$4,$5)'
        var values = [req.body.nome, req.body.telefone, req.body.email, req.body.usuario, req.body.senha]
        client.query(sql, values, (error, result) => {
            if (error) {
                return res.status(401).send('Operação não permitida')
            }
            res.status(201).send(result.rows[0])
        })
    })
})

app.get('/aluno/:idAluno', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Conexão não autorizada')
        }
        var sql = 'SELECT * FROM aluno WHERE aluno_id = $1'
        var values = [req.params.idAluno]
        client.query(sql, values, (error, result) => {
            if (error) {
                return res.status(401).send('Operação não permitida')
            }
            res.status(201).send(result.rows[0])
        })
    })
})

app.put('/aluno/:idAluno', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Conexão não autorizada')
        }
        client.query('SELECT * FROM aluno WHERE aluno_id = $1', [req.params.idAluno], (erro, resul) => {
            if (erro) {
                return res.status(401).send('Operação não permitida')
            }
            if (resul.rowCount > 0) {
                var sql = 'UPDATE aluno SET nome = $1, telefone = $2, email = $3, usuario = $4, senha = $5 WHERE aluno_id = $6'
                var values = [req.body.nome, req.body.telefone, req.body.email, req.body.usuario, req.body.senha, req.params.idAluno]
                client.query(sql, values, (error, result) => {
                    if (error) {
                        return res.status(401).send('Operação não permitida')
                    }
                    res.status(201).send(result.rows[0])
                })
            } else{
                res.status(401).send('Operação não permitida')
            }
        })

    })
})

app.delete('/aluno/:idAluno', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Conexão não autorizada')
        }
        client.query('SELECT * FROM aluno WHERE aluno_id = $1', [req.params.idAluno], (erro, resul) => {
            if (erro) {
                return res.status(401).send('Operação não permitida')
            }
            if (resul.rowCount > 0) {
                client.query('DELETE FROM aluno WHERE aluno_id = $1', [req.params.idAluno], (error, result) => {
                    if (error) {
                        return res.status(401).send('Operação não permitida')
                    }
                    res.status(201).send('Operação realizada com sucesso')
                })
            } else{
                res.status(401).send('Operação não permitida')
            }
        })

    })
})

app.listen(process.env.PORT || 8000, () => console.log('Aplicação em execução!'))

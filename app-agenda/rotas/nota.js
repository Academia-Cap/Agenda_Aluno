const express = require('express')

const rota = express.Router()

var pg = require('pg')

var consString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"

const pool = new pg.Pool({ connectionString: consString, ssl: { rejectUnauthorized: false } })

// Testando a conexão

// app.get('/disciplina', (req, res) => {
//     return res.status(200).send('Conexão feita')
// })

// Criar nota

rota.post('/', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Conexao não autorizada')
        }
        var sql = 'insert into nota (descricao, nota, iddisc) VALUES($1,$2,$3)'
        client.query(sql, [req.body.descricao, req.body.nota, req.params.iddisc], (error, result) => {
            if (error) {
                return res.status(401).send('Operação não permitida')
            }
            res.status(201).send("Nota cadastrada")
        })
    })
})

//Deletar nota

rota.delete('/:nota', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Não foi')
        }
        client.query('delete from nota where id = $1', [req.params.id], (error, result) => {
            if (error) {
                return res.status(401).send('Não funcionou')
            }
            res.status(200).send('nota deletado com sucesso!')
        })
    })
})

module.exports = rota;
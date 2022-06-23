const express = require('express')
const rota = express.Router()

const consultaBD = require('../banco_de_dados/comando_bd/disciplina_comando')

var pg = require('pg')
var consString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"
const pool = new pg.Pool({ connectionString: consString, ssl: { rejectUnauthorized: false } })

rota.post('/get', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('operação não permitida')
        }
        client.query(consultaBD.getAll,[req.body.id], (erro, result) => {
            if (erro) {
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
        client.query(consultaBD.postOne, [req.body.nome, req.body.abreviacao, req.body.docente, req.body.anotacao, req.body.idaluno, req.body.idinst], (error, result) => {
            if (error) {
                release()
                return res.status(401).send('Operação não permitida')
            }
            res.status(201).send("Disciplina cadastrada")
            release()
        })
    })
});

rota.get('/:id', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send("Conexão não autorizada")
        }
        client.query(consultaBD.getOne, [req.params.id], (error, result) => {
            if (error) {
                release()
                return res.status(401).send('Disciplina não localizada')
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
            return res.status(401).send('Conexão não autorizada')
        }
        client.query(consultaBD.getOne, [req.params.id], (erro, resul) => {
            if (erro) {
                release()
                return res.status(401).send('Disciplina não localizada')
            }
            if (resul.rowCount > 0) {
                var values = [req.body.nome, req.body.abreviacao, req.body.docente, req.body.anotacao, req.body.idinst, req.params.id]
                client.query(consultaBD.putAll, values, (error, result) => {
                    if (error) {
                        release()
                        return res.status(401).send('Operação não permitida')
                    }
                    res.status(201).send(result.rows[0])
                    release()
                })
            } else {
                res.status(401).send('Não foi possivel realizar a alteração')
                release()
            }
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
            res.status(200).send('Disciplina deletada com sucesso!')
            release()
        })
    })
})

module.exports = rota;
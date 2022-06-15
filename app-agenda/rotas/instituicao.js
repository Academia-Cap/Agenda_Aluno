const express = require('express')
//Declara uma variavel do tipo Router
const rota = express.Router();

var pg = require('pg')
var conString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

//Substitui o app.get pelo rota.get
rota.get('/', (req, res, release) => {
    pool.connect((err, client) => {
        if (err) {
            release()
            return res.status(401).send('operação não permitida')
        }
        client.query('SELECT * FROM instituicao', (erro, result) => {
            if (erro) {
                release()
                return res.status(401).send('Operação não autorizada')
            }
            res.status(200).send(result.rows)
            release()
        })
        release()
    })
})

rota.get('/:id', (req, res, release) => {
    pool.connect((err, client) => {
        if (err) {
            release()
            return res.status(401).send('operação não permitida')
        }
        client.query('SELECT * FROM instituicao WHERE id=$1',[req.params.id],(erro, result) => {
            if (erro) {
                release()
                return res.status(401).send({erro: err.message})
            }
            res.status(200).send(result.rows[0])
            release()
        })
        release()
    })
})

rota.post('/', (req, res, release) => {
    pool.connect((err, client) => {
        if (err) {
            release()
            return res.status(401).send('Conexao não autorizada', err.rows)
        }
        var sql = 'INSERT INTO instituicao(nome, sigla, cep, rua, cidade, estado) VALUES($1,$2,$3,$4,$5,$6)'
        client.query(sql, [req.body.nome, req.body.sigla, req.body.cep, req.body.rua, req.body.cidade, req.body.estado], (error, result) => {
            if (error) {
                release()
                return res.status(401).send('Operação não permitida')
            }
            res.status(201).send("Insituicao cadastrada")
            release()
        })
        release()
    })
})

rota.put('/:id', (req, res, release) => {
    pool.connect((err, client) => {
        if (err) {
            release()
            return res.status(401).send('Conexão não autorizada')
        }
        client.query('SELECT * FROM instituicao WHERE id = $1', [req.params.id], (erro, resul) => {
            if (erro) {
                release()
                return res.status(401).send('Operação não permitida')
            }
            if (resul.rowCount > 0) {
                var sql = 'UPDATE instituicao SET nome = $1, sigla = $2, cep = $3, rua = $4, cidade = $5, estado = $6 WHERE id = $7'
                var values = [req.body.nome, req.body.sigla, req.body.cep, req.body.rua, req.body.cidade, req.body.estado,req.params.id]
                client.query(sql, values, (error, result) => {
                    if (error) {
                        release()
                        return res.status(401).send('Operação não permitida')
                    }
                    res.status(201).send(result.rows[0])
                    release()
                })
            } else{
                release()
                res.status(401).send('Operação não permitida')
            }
        })
        release()
    })
});

rota.delete('/:id', (req, res, release) => {
    pool.connect((err, client) => {
        if (err) {
            release()
            return res.status(401).send('Deu erro! Operação não liberada!')
        }
        client.query('DELETE FROM instituicao WHERE id = $1', [req.params.id], (error, result) => {
            if (error) {
                release()
                return res.status(401).send('Não funcionou')
            }
            res.status(200).send('Usuario deletado com sucesso!')
            release()
        })
        release()
    })
})

//cria o modulo que sera exportado e vai ser chamado no index.js
module.exports = rota;
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

var pg = require('pg')

//var consString = 'postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc'

//const pool = new pg.Pool({ connectionString: consString, ssl: { rejectUnauthorized: false } })

const pool = new pg.Pool({connectionString: process.env.DATABASE_URL , ssl: {rejectUnauthorized: false}})

app.post('/instituicao', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Conexao não autorizada', err.rows)
        }
        var sql = 'INSERT INTO instituicao(nome_inst, sigla_int, cep_inst, rua_inst, cidade_inst, estado_inst) VALUES($1,$2,$3,$4,$5,$6)'
        client.query(sql, [req.body.nome, req.body.sigla, req.body.cep, req.body.rua, req.body.cidade, req.body.estado], (error, result) => {
            if (error) {
                return res.status(401).send('Operação não permitida')
            }
            res.status(201).send("Insituicao cadastrada")
        })
    })
})

app.get('/', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('operação não permitida')
        }
        client.query('SELECT * FROM instituicao', (erro, result) => {
            if (erro) {
                return res.status(401).send('Operação não autorizada')
            }
            res.status(200).send(result.rows)
        })
    })
})

app.delete('/instituicao/:id_inst', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Deu erro! Operação não liberada!')
        }
        client.query('DELETE FROM instituicao WHERE id_inst = $1', [req.params.id_inst], (error, result) => {
            if (error) {
                return res.status(401).send('Não funcionou')
            }
            res.status(200).send('Usuario deletado com sucesso!')
        })
    })
})

app.get('/instituicao/:id_inst', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('operação não permitida')
        }
        client.query('SELECT * FROM instituicao WHERE id_inst = $1',[req.params.id_inst],(erro, result) => {
            if (erro) {
                return res.status(401).send({erro: err.message})
            }
            res.status(200).send(result.rows)
        })
    })
})

app.put('/instituicao/:id_inst', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Deu erro! Operação não liberada!')
        }
        var sql = 'UPDATE instituicao SET nome_inst=$1, sigla_int=$2, cep_inst=$3, rua_inst=$4, cidade_inst=$5, estado_inst=$6 WHERE id_inst=$7'
        let variaveis = [req.body.nome_inst, req.body.sigla_inst, req.body.cep_inst, req.body.rua_inst, req.body.cidade_inst, req.body.estado_inst, req.params.id_inst]
        client.query(sql, variaveis, (error, result) => {
            if (error) {
                return res.status(401).send('Não funcionou')
            }
            res.status(200).send('Usuario alterado com sucesso.')
        })
    })
})

app.listen(process.env.PORT || 3000)
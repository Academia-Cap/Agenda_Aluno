const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

var pg = require('pg')

var consString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"

const pool = new pg.Pool({ connectionString: consString, ssl: { rejectUnauthorized: false } })

// Testando a conexão

// app.get('/disciplina', (req, res) => {
//     return res.status(200).send('Conexão feita')
// })

// Criar disciplina

app.post('/disciplina', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Disciplina não pode ser criada')
        }
        client.query('select * from disciplinas where disciplina = $1', [req.body.disciplina], (error, result) => {
            if (error){
                return res.status(401).send('Operação não autorizada')
            }
            if (result.rowCount > 0){
                return res.status(200).send('Registro ja existe')
            }

            var sql = 'insert into disciplinas (disciplina, abreviacao, docente, anotacoes) values ($1,$2,$3,$4)'
            client.query(sql, [req.body.disciplina, req.body.abreviacao, req.body.docente, req.body.anotacoes], (error, result) => {
                if (error) {
                    return res.status(403).send('Operação não permitida')
                }
                res.status(201).send({
                    mensagem: 'criado com sucesso',
                    status: 201
                })
            })
        })
    })
})

// Consultar disciplina por diciplina

app.get('/disciplina/:disciplina', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send("Conexão não autorizada")
        }
        client.query('select * from disciplinas where disciplina = $1', [req.params.disciplina], (error, result) => {
            if (error) {
                return res.status(401).send('Disciplina não localizada')
            }
            res.status(200).send(result.rows[0])
        })
    })
})

//Editar disciplina

app.put('/disciplina/:disciplina', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send("Conexão não autorizada")
        }
        client.query('select * from disciplinas where disciplina = $1', [req.params.disciplina], (error, result) => {
            if (error) {
                return res.status(401).send("Operação não permitida")
            }
            /**update usuarios set docente=$1, anotacoes=$2 where disciplina=$3 */
            if (result.rowCount > 0) {
                var sql = 'update disciplinas set docente=$1, anotacoes=$2 where disciplina=$3'
                let valores = [req.body.docente, req.body.anotacoes, req.params.disciplina]
                client.query(sql, valores, (error2, result2) => {
                    if (error2) {
                        return res.status(401).send("Operação não permitida")
                    }

                    if (result2.rowCount > 0) {
                        return res.status(200).send('Registro alterado com sucesso')
                    }
                })
            } else
                res.status(200).send('Disciplina não encontrado')
        })
    })
})

//Deletar disciplina

app.delete('/disciplina/:disciplina', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Conexão não autorizada')
        }
        client.query('delete from disciplinas where disciplina = $1', [req.params.disciplina], (error, result) => {
            if (error) {
                return res.status(401).send('Materia não localizada')
            }
            res.status(200).send({ message: 'Registro excluido com sucesso' })
        })
    })
})


app.listen(8081, () => console.log('Aplicação em execução na url http://localhost:8081'))
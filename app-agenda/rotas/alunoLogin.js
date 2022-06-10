const express = require('express')
const rota = express.Router();

var pg = require('pg')
var conString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const login = require('../middleware/login')

rota.get('/', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('Conexão não autorizada')
        }
        res.status(200).send('Conectado com sucesso')
    })
});

rota.post('/login', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send("Conexão não autorizada")
        }
        client.query('select * from aluno where email = $1', [req.body.email], (error, result) => {
            if (error) {
                return res.status(401).send('operação não permitida')
            }
            if (result.rowCount > 0) {
                bcrypt.compare(req.body.senha, result.rows[0].senha, (error, results) => {
                    if (error) {
                        return res.status(401).send({
                            message: "Falha na autenticação"
                        })
                    }
                    console.log(results)
                    if (results) {
                        let token = jwt.sign({
                            email: result.rows[0].email,
                        },
                            process.env.JWTKEY, { expiresIn: '1h' })
                        return res.status(200).send({
                            message: 'Conectado com sucesso',
                            token: token
                        })
                    }

                })
            } else {
                return res.status(200).send({
                    message: 'usuário não encontrado'
                })
            }
        })
    })
})

module.exports = rota;
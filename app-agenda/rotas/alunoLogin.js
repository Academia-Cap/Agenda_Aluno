const express = require('express')
const rota = express.Router();

var pg = require('pg')
var conString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const login = require('../middleware/login')

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

rota.post('/login', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send("Conexão não autorizada")
        }
        client.query('select * from aluno where email = $1', [req.body.email], (error, result) => {
            if (error) {
                release()
                return res.status(401).send('operação não permitida')
            }
            if (result.rowCount > 0) {
                bcrypt.compare(req.body.senha, result.rows[0].senha, (error, results) => {
                    if (error) {
                        release()
                        return res.status(401).send({
                            message: "Falha na autenticação"
                        })
                    }
                    if (results) {
                        let token = jwt.sign({
                            id: result.rows[0].id,
                            email: result.rows[0].email,
                            },
                            process.env.JWTKEY, { expiresIn: '1h' })
                        release()
                        return res.status(200).send({
                            message: 'Conectado com sucesso',
                            token: token
                        })
                    }
                })
            } else {
                release()
                return res.status(200).send({
                    message: 'usuário não encontrado'
                })
            }
        })
    })
})

module.exports = rota;
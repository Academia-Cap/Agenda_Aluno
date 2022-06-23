const express = require('express')
const rota = express.Router();

const consultaBD = require('../banco_de_dados/comando_bd/aluno_comando')
const mensagem = require('../mensagens/mensagem')

var pg = require('pg')
var conString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const login = require('../middleware/login')

rota.post('/login', login, (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        client.query(consultaBD.getEmail, [req.body.email], (error, result) => {
            if (error) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }
            if (result.rowCount > 0) {
                bcrypt.compare(req.body.senha, result.rows[0].senha, (error, results) => {
                    if (error) {
                        release()
                        return res.status(401).send(mensagem.ERRO_AUNTENTICACAO)
                    }
                    if (results) {
                        let token = jwt.sign({
                            id: result.rows[0].id,
                            email: result.rows[0].email,
                            },
                            process.env.JWTKEY, { expiresIn: '1h' })
                        release()
                        return res.status(200).send({token: token})
                    }
                })
            } else {
                release()
                return res.status(400).send(mensagem.SUCESSO_USUARIO)
            }
        })
    })
})

module.exports = rota;
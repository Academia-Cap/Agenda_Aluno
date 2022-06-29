const express = require('express')
const rota = express.Router();

const consultaBD = require('../banco_de_dados/comando_bd/calendario_comando')
const mensagem = require('../mensagens/mensagem')
const validar = require('../validar/calendario_validar')

var pg = require('pg')
var conString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

rota.get('/', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        client.query(consultaBD.getAll, (erro, result) => {
            if (erro) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }
            res.status(200).send(result.rows)
            release()
        })
    })
})

rota.get('/calendario/:id', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        client.query(consultaBD.getOne, [req.params.id], (erro, result) => {
            if (erro) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }
            res.status(200).send(result.rows[0])
            release()
        })
    })
})

rota.post('/periodo', (req, res) => {
    if(!validar.validarDate(req.body.periodo) || !validar.validarNumeros(req.body.idaluno)){
        return res.status(401).send(mensagem.ERRO_OPERACAO)
    }
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        var data = new Date(req.body.periodo).toLocaleDateString('en-US')
        client.query(consultaBD.getDate, [data, req.body.idaluno], (erro, result) => {
            if (erro) {
                release()
                return res.status(401).send(erro)
            }
            res.status(200).send(result.rows)
            release()
        })
    })
})


rota.post('/', (req, res) => {
    if(!validar.validarDados(req.body)){
        return res.status(401).send(mensagem.ERRO_OPERACAO)
    }
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        client.query(consultaBD.postOne, [req.body.titulo, req.body.periodo, req.body.horainicio, req.body.horafinal, req.body.descricao, req.body.iddisc, req.body.idaluno], (error, result) => {
            if (error) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }
            res.status(201).send(mensagem.SUCESSO_OPERACAO)
            release()
        })
    })
})

rota.put('/:id', (req, res) => {
    if(!validar.validarDadosAlteracao(req.body)){
        return res.status(401).send(mensagem.ERRO_OPERACAO)
    }
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        client.query(consultaBD.getOne, [req.params.id], (erro, resul) => {
            if (erro) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }

            if (resul.rowCount > 0) {
                var values = [req.body.titulo, req.body.periodo, req.body.horainicio, req.body.horafinal, req.body.descricao, req.body.iddisc, req.params.id]
                client.query(consultaBD.putAll, values, (error, result) => {
                    if (error) {
                        release()
                        return res.status(401).send(mensagem.ERRO_OPERACAO)
                    }
                    res.status(201).send(result.rows[0])
                    release()
                })
            } else {
                release()
                res.status(401).send(mensagem.ERRO_OPERACAO)
            }
        })

    })
});

rota.delete('/:id', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send(mensagem.ERRO_CONEXAO)
        }
        client.query(consultaBD.deleteOne, [req.params.id], (error, result) => {
            if (error) {
                release()
                return res.status(401).send(mensagem.ERRO_OPERACAO)
            }
            res.status(200).send(mensagem.SUCESSO_OPERACAO)
            release()
        })
    })
})

rota.post('/gerarDias', (req, res) => {
    if(!validar.validarDate(req.body.data)){
        return res.status(401).send(mensagem.ERRO_OPERACAO)
    }
    var data = new Date(req.body.data);
    if (data != "" && data != undefined) {
        lista_datas = [];
        var dia = data.getUTCDate();
        var mes = data.getUTCMonth();
        var ano = data.getUTCFullYear();
        var diaDaSemana = data.getDay();

        if (diaDaSemana == 0) {
            for (let i = 0; i < 7; i++) {
                lista_datas[i] = new Date(ano, mes, dia + i)
            }
            return res.status(201).send(lista_datas)
        }

        if (diaDaSemana == 6) {
            for (let i = 0; i < 7; i++) {
                lista_datas[diaDaSemana - i] = new Date(ano, mes, dia - i)
            }
            return res.status(201).send(lista_datas)
        }

        if (diaDaSemana > 0 && diaDaSemana < 6) {
            for (let i = 0; i < diaDaSemana; i++) {
                lista_datas[i] = new Date(ano, mes, dia - (diaDaSemana - i))
            }
            for (let i = diaDaSemana; i < 7; i++) {
                if (diaDaSemana == i) {
                    lista_datas[i] = new Date(ano, mes, dia)
                } else {
                    lista_datas[i] = new Date(ano, mes, dia + (i - diaDaSemana))
                }
            }
            return res.status(201).send(lista_datas)
        }
        return res.status(401).send(mensagem.ERRO_OPERACAO)
    } else {
        return res.status(401).send(mensagem.ERRO_OPERACAO)
    }
})

module.exports = rota;
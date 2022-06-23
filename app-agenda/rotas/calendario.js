const express = require('express')
const rota = express.Router();

const consultaBD = require('../banco_de_dados/comando_bd/calendario_comando')

var pg = require('pg')
var conString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

rota.get('/', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('operação não permitida')
        }
        client.query(consultaBD.getAll, (erro, result) => {
            if (erro) {
                release()
                return res.status(401).send('Operação não autorizada')
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
            return res.status(401).send('operação não permitida')
        }
        client.query(consultaBD.getOne, [req.params.id], (erro, result) => {
            if (erro) {
                release()
                return res.status(401).send("não autorizado")
            }
            res.status(200).send(result.rows[0])
            release()
        })
    })
})


rota.post('/periodo', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('operação não permitida')
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
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Conexao não autorizada')
        }
        client.query(consultaBD.postOne, [req.body.titulo, req.body.periodo, req.body.horainicio, req.body.horafinal, req.body.descricao, req.body.iddisc, req.body.idaluno], (error, result) => {
            if (error) {
                release()
                return res.status(401).send('Operação não permitida')
            }
            res.status(201).send("Tarefa Cadastrada")
            release()
        })
    })
})

rota.put('/:id', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Conexão não autorizada')
        }
        client.query(consultaBD.getOne, [req.params.id], (erro, resul) => {
            if (erro) {
                release()
                return res.status(401).send('Operação não permitida 1')
            }

            if (resul.rowCount > 0) {
                var values = [req.body.titulo, req.body.periodo, req.body.horainicio, req.body.horafinal, req.body.descricao, req.body.iddisc, req.params.id]
                client.query(consultaBD.putAll, values, (error, result) => {
                    if (error) {
                        release()
                        return res.status(401).send('Operação não permitida 2')
                    }
                    res.status(201).send(result.rows[0])
                    release()
                })
            } else {
                release()
                res.status(401).send('Operação não permitida 3')
            }
        })

    })
});

rota.delete('/:id', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Deu erro! Operação não liberada!')
        }
        client.query(consultaBD.deleteOne, [req.params.id], (error, result) => {
            if (error) {
                release()
                return res.status(401).send('Não funcionou')
            }
            res.status(200).send('Tarefa deletada com sucesso!')
            release()
        })
    })
})

rota.post('/gerarDias', (req, res) => {
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
        return res.status(401).send("Erro")
    } else {
        return res.status(401).send("Erro")
    }
})

module.exports = rota;
const express = require('express')
const rota = express.Router();

const bcrypt = require('bcrypt')

var pg = require('pg')
var conString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

rota.get('/gerarDias', (req, res) => {
    var data = new Date();
    if (data != "" && data != undefined) {
        lista_datas = [];
        var dia = data.getUTCDate();
        var mes = data.getUTCMonth();
        var ano = data.getUTCFullYear();
        var diaDaSemana = data.getDay();

        if (diaDaSemana == 0) {
            for (let i = 0; i < 7; i++) {
                lista_datas[i] = new Date(ano, mes, dia + i).toLocaleDateString()
            }
            return res.status(201).send(lista_datas)
        }

        if (diaDaSemana == 6) {
            for (let i = 0; i < 7; i++) {
                lista_datas[diaDaSemana - i] = new Date(ano, mes, dia - i).toLocaleDateString()
            }
            return res.status(201).send(lista_datas)
        }

        if (diaDaSemana > 0 && diaDaSemana < 6) {
            for (let i = 0; i < diaDaSemana; i++) {
                lista_datas[i] = new Date(ano, mes, dia - (diaDaSemana - i)).toLocaleDateString()
            }
            for (let i = diaDaSemana; i < 7; i++) {
                if (diaDaSemana == i) {
                    lista_datas[i] = new Date(ano, mes, dia).toLocaleDateString()
                } else {
                    lista_datas[i] = new Date(ano, mes, dia + (i - diaDaSemana)).toLocaleDateString()
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
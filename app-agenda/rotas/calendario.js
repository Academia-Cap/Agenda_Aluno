const express = require('express')
//Declara uma variavel do tipo Router
const rota = express.Router();

var pg = require('pg')
var conString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

//Substitui o app.get pelo rota.get
rota.get('/', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('operação não permitida')
        }
        client.query('SELECT * FROM tarefa', (erro, result) => {
            if (erro) {
                release()
                return res.status(401).send('Operação não autorizada')
            }
            res.status(200).send(result.rows)
            release()
        })
    })
})

/*rota.get('/:id', (req, res) => {
    pool.connect((err, client) => {
        if (err) {
            return res.status(401).send('operação não permitida')
        }
        client.query('SELECT * FROM tarefa WHERE id=$1',[req.params.id],(erro, result) => {
            if (erro) {
                return res.status(401).send({erro: err.message})
            }
            res.status(200).send(result.rows[0])
        })
    })
})*/


rota.post('/', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Conexao não autorizada', err.rows)
        }
        var sql = 'INSERT INTO tarefa(titulo,periodo,horainicio,horafinal,descricao,iddisc,idaluno) VALUES($1,$2,$3,$4,$5,$6,$7)'
        client.query(sql, [req.body.titulo,req.body.periodo,req.body.horainicio,req.body.horafinal,req.body.descricao,req.body.iddisc,req.body.idaluno], (error, result) => {
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
        client.query('SELECT * FROM tarefa WHERE id = $1', [req.params.id], (erro, resul) => {
            if (erro) {
                release()
                return res.status(401).send('Operação não permitida')
            }
            if (resul.rowCount > 0) {
                var sql = 'UPDATE instituicao SET titulo = $1, periodo = $2, horainicio = $3, horafinal = $4, descricao = $5, iddisc = $6 WHERE id = $7'
                var values = [req.body.titulo,req.body.periodo,req.body.horainicio,req.body.horafinal,req.body.descricao,req.body.iddisc,req.params.id]
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
        
    })
});

rota.delete('/:id', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            release()
            return res.status(401).send('Deu erro! Operação não liberada!')
        }
        client.query('DELETE FROM tarefa WHERE id = $1', [req.params.id], (error, result) => {
            if (error) {
                release()
                return res.status(401).send('Não funcionou')
            }
            res.status(200).send('Tarefa deletada com sucesso!')
            release()
        })
    })
})

//cria o modulo que sera exportado e vai ser chamado no index.js
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
            release()
            return res.status(201).send(lista_datas)
        }

        if (diaDaSemana == 6) {
            for (let i = 0; i < 7; i++) {
                lista_datas[diaDaSemana - i] = new Date(ano, mes, dia - i).toLocaleDateString()
            }
            release()
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
            release()
            return res.status(201).send(lista_datas)
        }
        release()
        return res.status(401).send("Erro")
    } else {
        release()
        return res.status(401).send("Erro")
    }
})

module.exports = rota;
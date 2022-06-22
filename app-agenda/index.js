const express = require('express')
const app = express()
const cors = require('cors')

const swaggerUi =require('swagger-ui-express')
const swaggerFile =require('./swagger.json')

app.use('/doc',swaggerUi.serve,swaggerUi.setup(swaggerFile))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

var pg = require('pg')
var conString = "postgres://rcyctkyujrcygh:b5460a54af185b46d27b4ce8fcdd299186bed84ea7796e63a3d992e96817f2be@ec2-52-200-215-149.compute-1.amazonaws.com:5432/da1kaev7a1i6hc"
const pool = new pg.Pool({ connectionString: conString, ssl: { rejectUnauthorized: false } })

//chama a rota do aluno
const rotaAluno = require('./rotas/aluno')
app.use("/aluno", rotaAluno)

//chama a rota de instituição
const rotaInstituicao = require('./rotas/instituicao')
app.use("/instituicao", rotaInstituicao)

//chama a rota de disciplina
const rotaDisciplina = require('./rotas/disciplina')
app.use("/disciplina", rotaDisciplina)

//chama a rota de aluno Login
const rotaAlunoLogin = require('./rotas/alunoLogin')
app.use("/alunoLogin", rotaAlunoLogin)

//chama a rota de calendario
const rotaCalendario = require('./rotas/calendario')
app.use("/calendario", rotaCalendario)

//chama a rota de nota
const rotaNota = require('./rotas/nota')
app.use("/nota", rotaNota)

app.get('/', (req, res) =>{
    res.status(201).send('Conectou!')
})


app.listen(process.env.PORT || 8000)
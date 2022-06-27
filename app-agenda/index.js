const express = require('express')
const app = express()
const cors = require('cors')

const swaggerUi =require('swagger-ui-express')
const swaggerFile =require('./swagger.json')

app.use('/doc',swaggerUi.serve,swaggerUi.setup(swaggerFile))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

const rotaAluno = require('./rotas/aluno')
app.use("/aluno", rotaAluno)

const rotaInstituicao = require('./rotas/instituicao')
app.use("/instituicao", rotaInstituicao)

const rotaDisciplina = require('./rotas/disciplina')
app.use("/disciplina", rotaDisciplina)

const rotaAlunoLogin = require('./rotas/alunoLogin')
app.use("/alunoLogin", rotaAlunoLogin)

const rotaCalendario = require('./rotas/calendario')
app.use("/calendario", rotaCalendario)

const rotaNota = require('./rotas/nota')
app.use("/nota", rotaNota)

app.get('/', (req, res) =>{
    res.status(201).send('Conectou!')
})

app.listen(process.env.PORT || 8000)
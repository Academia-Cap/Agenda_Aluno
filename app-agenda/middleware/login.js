var jwt = require('jsonwebtoken')
const mensagem = require('../mensagens/mensagem')

module.exports = (req, res, next) => {
    try {
        const decode = jwt.verify(req.body.token, process.env.JWTKEY)
        req.email = decode
        next()
    } catch (error) {
        return res.status(401).send(mensagem.ERRO_AUNTENTICACAO)
    }

}
var validatorEmail = require("email-validator"); 

function validarCampo(campo){
    if(campo.length >= 6){
        return true;
    } else{
        return false;
    }
}

function validarEmail(email){
    return validatorEmail.validate(email)
}

function validarDados(dados){
    if(!validarCampo(dados.nome)){
        return false;
    }
    if(!validarEmail(dados.email)){
        console.log("aqui")
        return false;
    }
    if(!validarCampo(dados.telefone)){
        return false;
    }
    if(!validarCampo(dados.usuario)){
        return false;
    }
    if(!validarCampo(dados.senha)){
        return false;
    }
    return true;
}

function validarDadosAlteracao(dados){
    if(!validarCampo(dados.nome)){
        return false;
    }
    if(!validarCampo(dados.telefone)){
        return false;
    }
    if(!validarCampo(dados.usuario)){
        return false;
    }
    return true;
}

module.exports = {
    validarDados,
    validarDadosAlteracao,
    validarCampo
}
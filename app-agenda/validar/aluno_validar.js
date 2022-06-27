var validatorEmail = require("email-validator"); 
var validatorTelefone = require("validar-telefone"); 

function validarCampo(campo){
    if(campo.length >= 6){
        return true;
    } else{
        return false;
    }
}

function validarEmail(email){
    validatorEmail.validate(email);
}

function validarTelefone(telefone){
    validatorTelefone.validate(telefone);
}

function validarDados(dados){
    if(!validarCampo(dados.nome)){
        return false;
    }
    if(!validarEmail(dados.email)){
        return false;
    }
    if(!validarTelefone(dados.telefone)){
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
    if(!validarTelefone(dados.telefone)){
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
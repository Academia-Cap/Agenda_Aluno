function validarCampo(campo) {
    if (campo != null && campo != undefined) {
        return true;
    } else {
        return false;
    }
}

function validarDate(data) {
    try {
        if(new Date(data) != "Invalid Date"){
            return true;
        }
    } catch (error) {
        console.log(error)
        return false;
    }
}

function validarNumeros(dado) {
    if (!isNaN(dado)) {
        return true;
    } else {
        return false;
    }
}

function validarDados(dados) {
    if (!validarCampo(dados.titulo)) {
        return false;
    }
    if (!validarCampo(dados.periodo)) {
        return false;
    }
    if (!validarCampo(dados.horainicio)) {
        return false;
    }
    if (!validarCampo(dados.horafinal)) {
        return false;
    }
    if (!validarCampo(dados.descricao)) {
        return false;
    }
    if (!validarCampo(dados.iddisc)) {
        return false;
    }
    if (!validarCampo(dados.idaluno)) {
        return false;
    }
    if(!validarDate(dados.periodo)){
        return false;
    }
    if(!validarNumeros(dados.idaluno)){
        return false;
    }
    if(!validarNumeros(dados.iddisc)){
        return false;
    }
    return true;
}

function validarDadosAlteracao(dados) {
    if (!validarCampo(dados.titulo)) {
        return false;
    }
    if (!validarCampo(dados.periodo)) {
        return false;
    }
    if (!validarCampo(dados.horainicio)) {
        return false;
    }
    if (!validarCampo(dados.horafinal)) {
        return false;
    }
    if (!validarCampo(dados.descricao)) {
        return false;
    }
    if (!validarCampo(dados.iddisc)) {
        return false;
    }
    if(!validarDate(dados.periodo)){
        return false;
    }
    return true;
}

module.exports = {
    validarDados,
    validarDadosAlteracao,
    validarCampo,
    validarDate,
    validarNumeros
}
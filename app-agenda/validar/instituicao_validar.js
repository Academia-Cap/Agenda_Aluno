function validarCampo(campo) {
    if (campo != null && campo != undefined) {
        return true;
    } else {
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
    if (!validarCampo(dados.nome)) {
        return false;
    }
    if (!validarCampo(dados.sigla)) {
        return false;
    }
    if (!validarCampo(dados.cep)) {
        return false;
    }
    if (!validarCampo(dados.rua)) {
        return false;
    }
    if (!validarCampo(dados.cidade)) {
        return false;
    }
    if (!validarCampo(dados.estado)) {
        return false;
    }
    if (!validarCampo(dados.idaluno)) {
        return false;
    }
    if(!validarNumeros(dados.idaluno)){
        return false;
    }
    return true;
}

function validarDadosAlteracao(dados) {
    if (!validarCampo(dados.nome)) {
        return false;
    }
    if (!validarCampo(dados.sigla)) {
        return false;
    }
    if (!validarCampo(dados.cep)) {
        return false;
    }
    if (!validarCampo(dados.rua)) {
        return false;
    }
    if (!validarCampo(dados.cidade)) {
        return false;
    }
    if (!validarCampo(dados.estado)) {
        return false;
    }
    return true;
}

module.exports = {
    validarDados,
    validarDadosAlteracao,
    validarCampo,
    validarNumeros
}
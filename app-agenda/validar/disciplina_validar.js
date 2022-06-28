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
    if (!validarCampo(dados.abreviacao)) {
        return false;
    }
    if (!validarCampo(dados.docente)) {
        return false;
    }
    if (!validarCampo(dados.anotacao)) {
        return false;
    }
    if (!validarCampo(dados.idaluno)) {
        return false;
    }
    if (!validarCampo(dados.idinst)) {
        return false;
    }
    if(!validarNumeros(dados.idaluno)){
        return false;
    }
    if(!validarNumeros(dados.idinst)){
        return false;
    }
    return true;
}

function validarDadosAlteracao(dados) {
    if (!validarCampo(dados.nome)) {
        return false;
    }
    if (!validarCampo(dados.abreviacao)) {
        return false;
    }
    if (!validarCampo(dados.docente)) {
        return false;
    }
    if (!validarCampo(dados.anotacao)) {
        return false;
    }
    if (!validarCampo(dados.idaluno)) {
        return false;
    }
    if (!validarCampo(dados.idinst)) {
        return false;
    }
    if(!validarNumeros(dados.idaluno)){
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
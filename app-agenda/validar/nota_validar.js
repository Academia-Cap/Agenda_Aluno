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
    if (!validarCampo(dados.descricao)) {
        return false;
    }
    if (!validarCampo(dados.nota)) {
        return false;
    }
    if (!validarCampo(dados.iddisc)) {
        return false;
    }
    if(!validarNumeros(dados.iddisc)){
        return false;
    }
    return true;
}

module.exports = {
    validarDados,
    validarCampo,
    validarNumeros
}
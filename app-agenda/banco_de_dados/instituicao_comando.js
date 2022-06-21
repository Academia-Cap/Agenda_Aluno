function getAll(){
    return 'SELECT * FROM instituicao';
}

function getOne(){
    return 'SELECT * FROM instituicao WHERE id=$1';
}

function postOne(){
    return 'INSERT INTO instituicao(nome, sigla, cep, rua, cidade, estado) VALUES($1,$2,$3,$4,$5,$6)';
}

function putAll(){
    return 'UPDATE instituicao SET nome = $1, sigla = $2, cep = $3, rua = $4, cidade = $5, estado = $6 WHERE id = $7';
}

function deleteOne(){
    return 'DELETE FROM instituicao WHERE id = $1';
}

module.exports = {
    getAll,
    postOne,
    getOne,
    putAll,
    deleteOne
}


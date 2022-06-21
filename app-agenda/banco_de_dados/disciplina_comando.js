function getAll(){
    return 'SELECT * FROM disciplina';
}

function getOne(){
    return 'SELECT * FROM disciplina WHERE id=$1';
}

function postOne(){
    return 'INSERT INTO disciplina(nome, abreviacao, docente, anotacao, idaluno, idinst) VALUES($1, $2, $3, $4, $5, $6)';
}

function putAll(){
    return 'UPDATE disciplina SET nome = $1, abreviacao = $2, docente = $3, anotacao = $4, idinst = $5 WHERE id = $6';
}

function deleteOne(){
    return 'DELETE FROM disciplina WHERE id = $1';
}

module.exports = {
    getAll,
    postOne,
    getOne,
    putAll,
    deleteOne
}


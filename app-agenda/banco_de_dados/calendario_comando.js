function getAll(){
    return 'SELECT * FROM tarefa';
}

function getOne(){
    return 'SELECT * FROM tarefa WHERE id = $1';
}

function getDate(){
    return 'SELECT * FROM tarefa WHERE periodo = $1 AND idaluno = $2';
}

function postOne(){
    return 'INSERT INTO tarefa(titulo, periodo, horainicio, horafinal, descricao, iddisc, idaluno) VALUES($1, $2, $3, $4, $5, $6, $7)';
}

function putAll(){
    return 'UPDATE tarefa SET titulo = $1, periodo = $2, horainicio = $3, horafinal = $4, descricao = $5, iddisc = $6 WHERE id = $7';
}

function deleteOne(){
    return 'DELETE FROM tarefa WHERE id = $1';
}

module.exports = {
    getAll,
    getOne,
    getDate,
    postOne,
    putAll,
    deleteOne
}


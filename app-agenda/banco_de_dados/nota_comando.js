function getAll(){
    return 'SELECT * FROM nota WHERE iddisc = $1';
}

function postOne(){
    return 'INSERT INTO nota (descricao, nota, iddisc) VALUES($1, $2, $3)';
}

function deleteOne(){
    return 'DELETE FROM Nota where id = $1';
}

module.exports = {
    getAll,
    postOne,
    deleteOne
}


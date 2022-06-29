const getAll = 'SELECT * FROM nota WHERE iddisc = $1';

const postOne = 'INSERT INTO nota (descricao, nota, iddisc) VALUES($1, $2, $3)';

const deleteOne = 'DELETE FROM Nota where id = $1';

module.exports = {
    getAll,
    postOne,
    deleteOne
}


const getAll = 'SELECT * FROM disciplina WHERE idaluno = $1';

const getOne = 'SELECT * FROM disciplina WHERE id = $1';

const postOne = 'INSERT INTO disciplina(nome, abreviacao, docente, anotacao, idaluno, idinst) VALUES($1, $2, $3, $4, $5, $6)';

const putAll = 'UPDATE disciplina SET nome = $1, abreviacao = $2, docente = $3, anotacao = $4, idinst = $5 WHERE id = $6';

const deleteOne = 'DELETE FROM disciplina WHERE id = $1';

module.exports = {
    getAll,
    postOne,
    getOne,
    putAll,
    deleteOne
}


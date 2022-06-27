const getAll = 'SELECT * FROM instituicao WHERE idaluno = $1';

const getOne = 'SELECT * FROM instituicao WHERE id = $1';

const postOne = 'INSERT INTO instituicao(nome, sigla, cep, rua, cidade, estado, idaluno) VALUES($1,$2,$3,$4,$5,$6,$7)';

const putAll = 'UPDATE instituicao SET nome = $1, sigla = $2, cep = $3, rua = $4, cidade = $5, estado = $6 WHERE id = $7';

const deleteOne = 'DELETE FROM instituicao WHERE id = $1';

module.exports = {
    getAll,
    getOne,
    postOne,
    putAll,
    deleteOne
}


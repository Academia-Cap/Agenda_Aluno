const getAll =  'SELECT * FROM aluno';

const getEmail = 'SELECT * FROM aluno WHERE email = $1'

const getOne = 'SELECT * FROM aluno WHERE id = $1';

const postOne = 'INSERT INTO aluno(nome, telefone, email, usuario, senha, idAvatar) VALUES($1,$2,$3,$4,$5,$6)';

const putAll = 'UPDATE aluno SET nome = $1, telefone = $2, usuario = $3 WHERE id = $4';

const putPassword = 'UPDATE aluno SET senha = $1 WHERE id = $2';

const deleteOne = 'DELETE FROM aluno WHERE id = $1';

module.exports = {
    getAll,
    getEmail,
    postOne,
    getOne,
    putAll,
    deleteOne,
    putPassword
}


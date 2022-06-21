function getAll(){
    return 'SELECT * FROM aluno';
}

function getEmail(){
    return 'SELECT * FROM aluno WHERE email = $1'
}

function getOne(){
    return 'SELECT * FROM aluno WHERE id = $1';
}

function postOne(){
    return 'INSERT INTO aluno(nome, telefone, email, usuario, senha) VALUES($1,$2,$3,$4,$5)';
}

function putAll(){
    return 'UPDATE aluno SET nome = $1, telefone = $2, usuario = $3 WHERE id = $4';
}

function putPassword(){
    return 'UPDATE aluno SET senha = $1 WHERE id = $2';
}

function deleteOne(){
    return 'DELETE FROM aluno WHERE id = $1';
}

module.exports = {
    getAll,
    getEmail,
    postOne,
    getOne,
    putAll,
    deleteOne,
    putPassword
}


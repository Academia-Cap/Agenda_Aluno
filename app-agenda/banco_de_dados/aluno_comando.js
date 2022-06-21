function getAll(){
    return 'select * from aluno';
}

function getEmail(dados){
    return 'select * from aluno where email = $1', [dados.email]
}

function postOne(dados, hash){
    return 'INSERT INTO aluno(nome, telefone, email, usuario, senha) VALUES($1,$2,$3,$4,$5)', 
    [dados.nome, dados.telefone, dados.email, dados, hash];
}

function getOne(dados){

}

module.exports = {
    getAll,
    getEmail,
    postOne,
    getOne
}

